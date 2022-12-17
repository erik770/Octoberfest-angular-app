import { Component, OnInit } from "@angular/core";
import { IBrewery } from "./models/brewery";
import { BreweriesService } from "./services/breweries.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "nosi-trans-beerfest";
}
