import { Component, Input } from "@angular/core";
import { IBrewery } from "src/app/models/brewery";

@Component({
  selector: "app-brewery-item",
  templateUrl: "./brewery-item.component.html",
  styleUrls: ["./brewery-item.component.scss"],
})
export class BreweryItemComponent {
  @Input() brewery: IBrewery;
}
