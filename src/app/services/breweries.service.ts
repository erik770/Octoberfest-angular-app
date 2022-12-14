import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { IBrewery } from "../models/brewery";

@Injectable({
    providedIn: "root",
})
export class BreweriesService {
    constructor(private http: HttpClient){
    }

    loadPortion(pageNumber: number, portionSize: number) {
        return this.http.get<IBrewery[]>(`https://api.openbrewerydb.org/breweries?by_dist=55.75124,37.61842&page=${pageNumber}&per_page=${portionSize}`)
    }

    search(searchString: string) {
        return this.http.get<IBrewery[]>(`https://api.openbrewerydb.org/breweries/search?by_dist=55.75124,37.61842&query=${searchString}&per_page=50`)
    }

    getAll(): Observable<IBrewery[]> {
        return this.http.get<IBrewery[]>("https://api.openbrewerydb.org/breweries")
    }
}
