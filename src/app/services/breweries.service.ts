import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscriber } from "rxjs";
import { IBrewery } from "../models/brewery";
import { IPosition } from "../models/position";
import {
  BASE_URL,
  defaultPosition,
  NEAR_BREWERIES_COUNT,
} from "../consts/consts";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class BreweriesService {
  constructor(private http: HttpClient, private router: Router) { }
  private breweriesSubject: BehaviorSubject<IBrewery[]> =
    new BehaviorSubject<IBrewery[]>([]);
  breweries$: Observable<IBrewery[]> = this.breweriesSubject.asObservable();
  localBreweries: IBrewery[] = [];

  getNearby(position: IPosition) {
    if (this.localBreweries.length !== 0) {
      this.breweriesSubject.next(this.localBreweries);
      return;
    }
    this.http
      .get<IBrewery[]>(BASE_URL, {
        params: {
          by_dist: `${position.latitude},${position.longitude}`,
          per_page: NEAR_BREWERIES_COUNT,
        },
      })
      .subscribe((breweries) => {
        this.localBreweries = breweries;
        this.breweriesSubject.next(breweries);
      });
  }

  loadPortion(pageNumber: number, portionSize: number) {
    this.http
      .get<IBrewery[]>(BASE_URL, {
        params: {
          by_dist: `${defaultPosition.latitude},${defaultPosition.longitude}`,
          page: pageNumber,
          per_page: portionSize,
        },
      })
      .subscribe((breweries) => {
        this.breweriesSubject.next(breweries);
      });
  }

  search(searchString: string) {
    this.http
      .get<IBrewery[]>(`${BASE_URL}/search`, {
        params: {
          query: searchString,
        },
      })
      .subscribe((breweries) => {
        this.breweriesSubject.next(breweries);
      });
  }

  getBreweryById(id: string | number): Observable<IBrewery> {
    return new Observable<IBrewery>((observer: Subscriber<IBrewery>) => {
      this.breweries$
        .subscribe((currentBreweries) => {
          const brewery = currentBreweries.find((brewery) => brewery.id === id);
          if (brewery) {
            observer.next(brewery);
            observer.complete();
          } else {
            this.http.get<IBrewery>(`${BASE_URL}/${id}`).subscribe({
              next: (brewery) => {
                observer.next(brewery);
                observer.complete();
              },
              error: () => this.router.navigate(["breweries"]),
            });
          }
        })
        .unsubscribe();
    });
  }
}
