import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BreweriesPageComponent } from "./pages/breweries-page/breweries-page.component";
import { PromoPageComponent } from "./pages/promo-page/promo-page.component";

const routes: Routes = [
  { path: "", component: PromoPageComponent },
  { path: "breweries", component: BreweriesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
