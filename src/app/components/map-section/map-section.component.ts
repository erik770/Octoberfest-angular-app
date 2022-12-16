import { AfterViewInit, Component } from "@angular/core";
import * as L from "leaflet";
import { Observable, Subscriber } from "rxjs";
// import { environment } from "../../environments/environment";

@Component({
  selector: "app-map-section",
  templateUrl: "./map-section.component.html",
  styleUrls: ["./map-section.component.scss"]
})
export class MapSectionComponent implements AfterViewInit {
  map: any;

  ngAfterViewInit(): void {
    this.map = L.map("map").setView([50, 17], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 13,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.getCurrentPosition().subscribe((position: any) => this.map.flyTo([position.latitude, position.longitude], 4));
  }

  private getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      console.log(navigator.geolocation);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  // private loadMap(): void {
  //   this.map = L.map("map").setView([0, 0], 1);
  //   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 18,
  //     id: "mapbox/streets-v11",
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     accessToken: environment.mapbox.accessToken,
  //   }).addTo(this.map);

  //   this.getCurrentPosition()
  //   .subscribe((position: any) => {
  //     this.map.flyTo([position.latitude, position.longitude], 13);

  //     const icon = L.icon({
  //       iconUrl: "assets/images/marker-icon.png",
  //       shadowUrl: "assets/images/marker-shadow.png",
  //       popupAnchor: [13, 0],
  //     });

  //     const marker = L.marker([position.latitude, position.longitude], { icon }).bindPopup("Angular Leaflet");
  //     marker.addTo(this.map);
  //   });
  // }

}
