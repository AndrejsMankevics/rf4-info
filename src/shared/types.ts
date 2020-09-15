export interface FishingPlace {
  id: number;
  name: string;
  url: string;
  width: number;
  height: number;
  markers: FishingMapMarker[];
}

export interface FishingMapMarker {
  id: number;
  x: number;
  y: number;
  name: string;
  baits: Bait[];
}

export interface Bait {
  id: number;
  name: string;
  url: string;
}
