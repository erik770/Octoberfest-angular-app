import { Component, Input } from "@angular/core";
import { IBrewery } from "src/app/models/brewery";

@Component({
  selector: "app-brewery-item",
  templateUrl: "./breweryItem.component.html",
})

export class BreweryItemComponent {
    @Input() brewery : IBrewery
}
