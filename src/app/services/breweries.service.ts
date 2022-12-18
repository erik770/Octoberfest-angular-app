import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { IBrewery } from "../models/brewery";
import { IPosition } from "../models/position";
import { defaultPosition } from "../consts/consts";
import { breweries } from "../data/breweries";

@Injectable({
  providedIn: "root",
})
export class BreweriesService {
  constructor(private http: HttpClient) {}
  // currentState здесь хранить массив с пивоварнями и в методах получения обновлять, а когда надо 1 то искать в массиве
  private breweriesSubject: BehaviorSubject<IBrewery[]> = new BehaviorSubject<
    IBrewery[]
  >([]);
  breweries$: Observable<IBrewery[]> = this.breweriesSubject.asObservable();

  getNearby(position: IPosition) {
    this.http
      .get<IBrewery[]>(
        `https://api.openbrewerydb.org/breweries?by_dist=${position.latitude},${position.longitude}&per_page=5`
      )
      .subscribe((breweries) => {
        this.breweriesSubject.next(breweries);
      });
  }
  loadPortion(pageNumber: number, portionSize: number) {
    return this.http.get<IBrewery[]>(
      `https://api.openbrewerydb.org/breweries?by_dist=${defaultPosition.latitude},${defaultPosition.longitude}&page=${pageNumber}&per_page=${portionSize}`
    );
  }

  search(searchString: string) {
    return this.http.get<IBrewery[]>(
      `https://api.openbrewerydb.org/breweries/search?&query=${searchString}`
    );
  }

  getAll(): Observable<IBrewery[]> {
    return this.http.get<IBrewery[]>("https://api.openbrewerydb.org/breweries");
  }

  getBreweryById(id: string | number): Observable<IBrewery> {
    return this.http.get<IBrewery>(
      `https://api.openbrewerydb.org/breweries/${id}`
    );
  }
}
