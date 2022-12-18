import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import * as L from "leaflet";
import { Subscription } from "rxjs";
import { IBrewery } from "src/app/models/brewery";
import { BreweriesService } from "src/app/services/breweries.service";

@Component({
  selector: "app-brewery-page",
  templateUrl: "./brewery-page.component.html",
  styleUrls: ["./brewery-page.component.scss"],
})
export class BreweryPageComponent implements OnInit, AfterViewInit {
  brewery: IBrewery;
  map: L.Map;

  constructor(
    private activateRoute: ActivatedRoute // private breweriesService: BreweriesService
  ) {}
  ngOnInit(): void {
    this.activateRoute.data.subscribe(
      (resolverData) => (this.brewery = resolverData.brewery)
    );
  }

  ngAfterViewInit(): void {
    this.map = L.map("map").setView(
      [+this.brewery.latitude, +this.brewery.longitude],
      14
    );
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
      }
    ).addTo(this.map);
    this.addBreweryOnMap();
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
