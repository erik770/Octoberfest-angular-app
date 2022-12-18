import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BreweriesPageComponent } from "./pages/breweries-page/breweries-page.component";
import { BreweryPageComponent } from "./pages/brewery-page/brewery-page.component";
import { PromoPageComponent } from "./pages/promo-page/promo-page.component";
import { BreweryResolver } from "./resolvers/brewery.resolver";

const routes: Routes = [
  { path: "", title: "Octoberfest 2023", component: PromoPageComponent },
  {
    path: "breweries/:id",
    component: BreweryPageComponent,
    resolve: {
      brewery: BreweryResolver,
    },
  },
  {
    path: "breweries",
    title: "Octoberfest breweries",
    component: BreweriesPageComponent,
  },
  { path: "**", component: BreweriesPageComponent }, // TODO: err page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
