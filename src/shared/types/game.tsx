export interface FishingPlace {
  id: string;
  name: string;
  lvl: number;
  mapUrl: string;
  selectorUrl: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
  markers: FishingMapMarker[];
}

export interface FishingMapMarker {
  id: string;
  placeId: string;
  x: number;
  y: number;
  name: string;
  baits: string[];
  timestamp: number;
}

export interface Bait {
  id: string;
  name: string;
  spriteX: number;
  spriteY: number;
}
