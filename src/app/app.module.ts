import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DataViewModule } from "primeng/dataview";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BreweryItemComponent } from "./components/breweryItem/brewery-item.component";
import { PromoPageComponent } from "./pages/promo-page/promo-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { NearSectionComponent } from "./components/near-section/near-section.component";
import { BreweriesPageComponent } from "./pages/breweries-page/breweries-page.component";
import { PromoLandingSectionComponent } from "./components/promo-landing-section/promo-landing-section.component";
import { InputTextModule } from "primeng/inputtext";
import { BreweryPageComponent } from "./pages/brewery-page/brewery-page.component";
import { BreweryTypePipe } from "./pipes/breweryType.pipe";

@NgModule({
  declarations: [
    AppComponent,
    BreweryItemComponent,
    PromoPageComponent,
    HeaderComponent,
    NearSectionComponent,
    BreweriesPageComponent,
    PromoLandingSectionComponent,
    BreweryPageComponent,
    BreweryTypePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataViewModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
