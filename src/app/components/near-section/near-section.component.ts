import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { IBrewery } from "src/app/models/brewery";
import { BreweriesService } from "src/app/services/breweries.service";
import * as L from "leaflet";
import { IPosition } from "src/app/models/position";
import { defaultPosition, MAP_SETTINGS } from "src/app/consts/consts";

@Component({
  selector: "app-near-section",
  templateUrl: "./near-section.component.html",
  styleUrls: ["./near-section.component.scss"],
})
export class NearSectionComponent implements OnInit, AfterViewInit {
  currentPosition: IPosition = defaultPosition;
  localBreweries$: Observable<IBrewery[]>;
  map: L.Map;
  constructor(private brewerisesService: BreweriesService) {
    this.localBreweries$ = this.brewerisesService.breweries$;
  }

  ngOnInit(): void {
    this.getCurrentPosition().subscribe({
      next: (position: IPosition) => {
        this.currentPosition = position;
        this.initBreweries(position);
        this.addUserLocationMarker(this.currentPosition);
      },
      error: () => this.initBreweries(defaultPosition),
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map("map").setView(
      [this.currentPosition.latitude, this.currentPosition.longitude],
      4
    );
    L.tileLayer(MAP_SETTINGS.TILES_TEMPLATE_URL, {
      maxZoom: MAP_SETTINGS.MAX_ZOOM,
      attribution: MAP_SETTINGS.ATTRIBUTION,
    }).addTo(this.map);
  }

  private initBreweries(position: IPosition) {
    this.brewerisesService.getNearby(position);
    this.localBreweries$.subscribe((breweries: IBrewery[]) => {
      if (breweries.length === 0) return;
      const nearestBrewery = breweries[0];
      const middlePoint = this.middlePoint(position, {
        latitude: +nearestBrewery.latitude,
        longitude: +nearestBrewery.longitude,
      });
      this.map.flyTo([middlePoint.latitude, middlePoint.longitude], 4);
      this.addBreweriesOnMap(breweries);
    });
  }

  private getCurrentPosition(): Observable<IPosition> {
    return new Observable((observer: Subscriber<IPosition>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            observer.complete();
          },
          () => observer.error()
        );
      } else {
        observer.error();
      }
    });
  }

  private addBreweriesOnMap(breweries: IBrewery[]) {
    const icon = L.icon({
      iconUrl: "assets/breweryIcon.svg",
      iconAnchor: [8, 0],
    });

    breweries.forEach((brewery: IBrewery) =>
      L.marker([+brewery.latitude, +brewery.longitude], { icon })
        .bindPopup(brewery.name)
        .addTo(this.map)
    );
  }

  private addUserLocationMarker(position: IPosition) {
    const icon = L.icon({
      iconUrl: "assets/userPositionIcon.svg",
      iconAnchor: [16, 8],
    });
    L.marker([position.latitude, position.longitude], { icon })
      .bindPopup("You are here!")
      .addTo(this.map);
  }

  // TODO: куда-то это переместить, в утилс
  private degToRad = (degrees: number) => degrees * (Math.PI / 180);
  private radToDeg = (radians: number) => radians * (180 / Math.PI);

  // Формула для подсчета средней точки на сфере (нельзя просто сумму пополам, тк точки на сфере)
  // http://www.movable-type.co.uk/scripts/latlong.html#:~:text=%CE%B8%2B180)%20%25%20360).-,Midpoint,-This%20is%20the
  private middlePoint(pos1: IPosition, pos2: IPosition): IPosition {
    const lat1 = this.degToRad(pos1.latitude);
    const lon1 = this.degToRad(pos1.longitude);
    const lat2 = this.degToRad(pos2.latitude);
    const lon2 = this.degToRad(pos2.longitude);

    const deltaLon = lon2 - lon1;

    const Bx = Math.cos(lat2) * Math.cos(deltaLon);
    const By = Math.cos(lat2) * Math.sin(deltaLon);
    const latMid = Math.atan2(
      Math.sin(lat1) + Math.sin(lat2),
      Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
    );
    const lonMid = lon1 + Math.atan2(By, Math.cos(lat1) + Bx);
    return {
      latitude: this.radToDeg(latMid),
      longitude: this.radToDeg(lonMid),
    };
  }
}
