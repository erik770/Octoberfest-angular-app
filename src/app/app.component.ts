import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { slider } from "./route-animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [slider],
})
export class AppComponent {
  title = "Octoberfest 2023";

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
}
