export interface FishingPlace {
  id: string;
  name: string;
  mapUrl: string;
  selectorUrl: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  markers: FishingMapMarker[];
}

export interface FishingMapMarker {
  id: number;
  x: number;
  y: number;
  name: string;
  baits: number[];
}

export interface Bait {
  id: number;
  name: string;
  url: string;
}
