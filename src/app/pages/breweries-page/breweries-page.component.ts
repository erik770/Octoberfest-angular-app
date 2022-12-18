import { Component } from "@angular/core";
import {
  BREWERIES_PER_PAGE,
  BREWERIES_TOTAL_COUNT,
} from "src/app/consts/consts";
import { IBrewery } from "src/app/models/brewery";
import { BreweriesService } from "src/app/services/breweries.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, skip, Subscriber } from "rxjs";

@Component({
  selector: "app-breweries-page",
  templateUrl: "./breweries-page.component.html",
  styleUrls: ["./breweries-page.component.scss"],
})
export class BreweriesPageComponent {
  breweriesPerPage = BREWERIES_PER_PAGE;
  breweries$: Observable<IBrewery[]>;
  breweriesTotalCount = BREWERIES_TOTAL_COUNT;
  isLazyLoadingEnabled = true;

  constructor(
    private brewerisesService: BreweriesService,
    private route: ActivatedRoute
  ) {
    this.breweries$ = this.brewerisesService.breweries$;
  }

  loadData(event: { rows: number; first: number }) {
    const pageNumber = event.first / event.rows + 1;
    this.brewerisesService.loadPortion(pageNumber, event.rows);
  }

  filter(name: string) {
    if (name !== "") {
      this.brewerisesService.search(name);
      this.breweries$.subscribe((breweries) => {
        this.breweriesTotalCount = breweries.length;
        this.isLazyLoadingEnabled = false;
      });
    } else {
      this.isLazyLoadingEnabled = true;
      this.breweriesTotalCount = BREWERIES_TOTAL_COUNT;
      this.brewerisesService.loadPortion(1, this.breweriesPerPage);
    }
  }
}
