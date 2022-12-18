import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { IBrewery } from "../models/brewery";
import { BreweriesService } from "../services/breweries.service";

@Injectable({
  providedIn: "root",
})
export class BreweryResolver implements Resolve<IBrewery> {
  constructor(private breweriesService: BreweriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IBrewery> | IBrewery {
    return this.breweriesService.getBreweryById(route.params["id"]);
  }
}
