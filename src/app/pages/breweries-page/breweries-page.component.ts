import { Component } from "@angular/core";
import {
  BREWERIES_PER_PAGE,
  BREWERIES_TOTAL_COUNT,
} from "src/app/consts/consts";
import { IBrewery } from "src/app/models/brewery";
import { BreweriesService } from "src/app/services/breweries.service";

@Component({
  selector: "app-breweries-page",
  templateUrl: "./breweries-page.component.html",
  styleUrls: ["./breweries-page.component.scss"],
})
export class BreweriesPageComponent {
  constructor(private brewerisesService: BreweriesService) {}
  breweriesPerPage = BREWERIES_PER_PAGE;
  breweries: IBrewery[] = [];
  breweriesTotalCount = BREWERIES_TOTAL_COUNT;
  isLazyLoadingEnabled = true;

  loadData(event: { rows: number; first: number }) {
    const pageNumber = event.first / event.rows + 1;
    this.brewerisesService
      .loadPortion(pageNumber, event.rows)
      .subscribe((breweries) => (this.breweries = breweries));
  }

  filter(name: string) {
    if (name !== "") {
      this.brewerisesService.search(name).subscribe((breweries) => {
        this.breweries = breweries;
        this.breweriesTotalCount = breweries.length;
        this.isLazyLoadingEnabled = false;
      });
    } else {
      this.isLazyLoadingEnabled = true;
      this.breweriesTotalCount = BREWERIES_TOTAL_COUNT;
      this.brewerisesService
        .loadPortion(1, this.breweriesPerPage)
        .subscribe((breweries) => (this.breweries = breweries));
    }
  }
}
