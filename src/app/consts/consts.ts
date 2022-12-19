import { IPosition } from "../models/position";

export const defaultPosition: IPosition = {
  latitude: 49,
  longitude: 15,
};
export const BASE_URL = "https://api.openbrewerydb.org/breweries";
export const MAP_SETTINGS = {
  TILES_TEMPLATE_URL:
    "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
  MAX_ZOOM: 20,
  ATTRIBUTION: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
};

export const NEAR_BREWERIES_COUNT = 5;
export const BREWERIES_PER_PAGE = 20;
export const BREWERIES_TOTAL_COUNT = 5777;
