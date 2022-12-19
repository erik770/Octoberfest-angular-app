import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promo-landing-section",
  templateUrl: "./promo-landing-section.component.html",
  styleUrls: ["./promo-landing-section.component.scss"],
})
export class PromoLandingSectionComponent implements OnInit {
  isMobile = false;

  ngOnInit(): void {
    if (window.screen.width < 768) {
      this.isMobile = true;
    }
  }
}
