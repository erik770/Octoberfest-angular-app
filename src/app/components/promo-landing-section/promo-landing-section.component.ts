import { Component } from "@angular/core";

@Component({
  selector: "app-promo-landing-section",
  templateUrl: "./promo-landing-section.component.html",
  styleUrls: ["./promo-landing-section.component.scss"],
})
export class PromoLandingSectionComponent {
  isMobile = false;

  ngOnInit(): void {
    if (window.screen.width < 768) {
      this.isMobile = true;
    }
  }
}
