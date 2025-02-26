export interface AreaT {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string;
  meta: {
    osm_id: null;
    google_maps_place_id: string;
  };
  type: string;
  name: {
    en: string;
    ru: string;
    uk: string;
  };
  public_name: {
    en: string;
    ru: string;
    uk: string;
  };
  post_code: string[];
  katottg: string;
  koatuu: string;
  lng: number;
  lat: number;
  parent_id: number;
}

export type AreasT = AreaT[];
