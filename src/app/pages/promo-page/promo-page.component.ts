import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promo-page",
  templateUrl: "./promo-page.component.html",
  styleUrls: ["./promo-page.component.scss"]
})

export class PromoPageComponent implements OnInit {
  isMobile = false;

  ngOnInit(): void {
    if (window.screen.width < 768) {
      this.isMobile = true;
    }
  }
}
