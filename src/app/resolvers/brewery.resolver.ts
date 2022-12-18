import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IBrewery } from "../models/brewery";
import { BreweriesService } from "../services/breweries.service";

@Injectable({
  providedIn: "root",
})
export class BreweryResolver implements Resolve<IBrewery> {
  constructor(private breweriesService: BreweriesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBrewery> | IBrewery {
    return this.breweriesService.getBreweryById(route.params["id"]);
  }
}
