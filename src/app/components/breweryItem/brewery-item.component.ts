import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IBrewery } from "src/app/models/brewery";
import { IPosition } from "src/app/models/position";

@Component({
  selector: "app-brewery-item",
  templateUrl: "./brewery-item.component.html",
  styleUrls: ["./brewery-item.component.scss"],
})
export class BreweryItemComponent {
  @Input() brewery: IBrewery;
}
