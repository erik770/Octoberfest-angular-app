import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBrewery } from "../models/brewery";
import { IPosition } from "../models/position";
import { defaultPosition } from "../consts/consts";

@Injectable({
  providedIn: "root",
})
export class BreweriesService {
  constructor(private http: HttpClient) {}

  getNearby(position: IPosition) {
    return this.http.get<IBrewery[]>(
      `https://api.openbrewerydb.org/breweries?by_dist=${position.latitude},${position.longitude}&per_page=5`
    );
  }
  loadPortion(pageNumber: number, portionSize: number) {
    return this.http.get<IBrewery[]>(
      `https://api.openbrewerydb.org/breweries?by_dist=${defaultPosition.latitude},${defaultPosition.longitude}&page=${pageNumber}&per_page=${portionSize}`
    );
  }

  search(searchString: string) {
    return this.http.get<IBrewery[]>(
      `https://api.openbrewerydb.org/breweries/search?&query=${searchString}&`
    );
  }

  getAll(): Observable<IBrewery[]> {
    return this.http.get<IBrewery[]>("https://api.openbrewerydb.org/breweries");
  }
}
