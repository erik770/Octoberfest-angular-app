import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatBreweryType",
})
export class BreweryTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case "micro":
        return "a quite small craft brewery";
      case "nano":
        return "an extremely small brewery which only distributes locally";
      case "regional":
        return "a regional plant of a large chain of breweries";
      case "brewpub":
        return "a beer-focused restaurant with a brewery on-premise";
      case "large":
        return "a very large brewery";
      case "planning":
        return "a brewery in planning or not yet opened to the public";
      case "bar":
        return "rather than a brewery and a bar";
      case "contract":
        return "a contract brewery that uses another brewery’s equipment";
      case "proprietor":
        return "a contract brewery that lands equipment to another brewery";
      case "closed":
        return "a brewery that unfortunately now closed";
      default:
        break;
    }
    return value;
  }
}
