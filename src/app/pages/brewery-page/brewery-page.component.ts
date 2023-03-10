import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as L from "leaflet";
import { MAP_SETTINGS } from "src/app/consts/consts";
import { IBrewery } from "src/app/models/brewery";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-brewery-page",
  templateUrl: "./brewery-page.component.html",
  styleUrls: ["./brewery-page.component.scss"],
})
export class BreweryPageComponent implements OnInit, AfterViewInit {
  brewery: IBrewery;
  map: L.Map;
  hasCoords = true;
  constructor(private activateRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activateRoute.data.subscribe((resolverData) => {
      this.brewery = resolverData.brewery;
      if (+this.brewery.latitude === 0 && +this.brewery.longitude === 0) {
        this.hasCoords = false;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.hasCoords) {
      this.map = L.map("map2").setView(
        [+this.brewery.latitude, +this.brewery.longitude],
        14
      );
      this.addBreweryOnMap();
    } else {
      this.map = L.map("map2").setView([0, 0], 1);
    }
    L.tileLayer(MAP_SETTINGS.TILES_TEMPLATE_URL, {
      maxZoom: MAP_SETTINGS.MAX_ZOOM,
      attribution: MAP_SETTINGS.ATTRIBUTION,
      accessToken: environment.apiKey,
    }).addTo(this.map);
  }

  private addBreweryOnMap() {
    const icon = L.icon({
      iconUrl: "assets/breweryIcon.svg",
      iconAnchor: [8, 0],
    });

    L.marker([+this.brewery.latitude, +this.brewery.longitude], { icon })
      .bindPopup(`${this.brewery.name}, ${this.brewery.street}`)
      .addTo(this.map);
  }
}
