import { Component, OnInit } from "@angular/core";
import { IBrewery } from "./models/brewery";
import { BreweriesService } from "./services/breweries.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})

export class AppComponent{
  constructor(private brewerisesService : BreweriesService) { }

  title = "nosi-trans-beerfest";
  breweries: IBrewery[] = [];
  breweriesTotalCount = 1000;

  loadData(event:{rows: number; first: number}) {
    const pageNumber = event.first / event.rows + 1;
    this.brewerisesService.loadPortion(pageNumber, event.rows).subscribe((breweries) => this.breweries = breweries)
    console.log(event);
  }

  filter(name: string) {
    this.brewerisesService.search(name).subscribe((breweries) => this.breweries = breweries)
  }
}
