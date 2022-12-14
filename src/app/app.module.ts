import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {DataViewModule} from "primeng/dataview";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BreweryItemComponent } from "./components/breweryItem/breweryItem.component";
import { PromoPageComponent } from "./pages/promo-page/promo-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { MapSectionComponent } from "./components/map-section/map-section.component";

@NgModule({
  declarations: [
    AppComponent,
    BreweryItemComponent,
    PromoPageComponent,
    HeaderComponent,
    MapSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataViewModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
