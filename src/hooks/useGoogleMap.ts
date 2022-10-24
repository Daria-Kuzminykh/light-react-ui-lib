import {Loader as GoogleMapLoader} from '@googlemaps/js-api-loader';
import {
  RefObject, useEffect, useRef, useState,
} from 'react';

const MIN_ZOOM = 3;
const MAX_ZOOM = 17;
const DEFAULT_ZOOM = 14;

const DEFAULT_CENTER_COORDINATES = {
  latitude: 55.7054836,
  longitude: 37.635054,
};

const normalizeCoordinate = (value) => (typeof value === 'string'
  ? parseFloat(value)
  : value);

export function convertToGoogleMapCoords(coordinates: IMapCoordinates): google.maps.LatLngLiteral {
  return {
    lat: normalizeCoordinate(coordinates.latitude),
    lng: normalizeCoordinate(coordinates.longitude),
  };
}

const removeMarkers = (markers: Record<string, google.maps.Marker>) => {
  const markersArray = Object.entries(markers);

  if (markersArray.length) {
    markersArray.forEach(([markerKey, markerValue]) => {
      markerValue.setMap(null);
      delete markers[markerKey];
    });
  }
};

export interface IMapCoordinates {
  latitude: number,
  longitude: number,
}

export interface IMapPoint {
  id: number,
  latitude: number,
  longitude: number,
  icon: string,
}

export default function useGoogleMap(
  mapRef: RefObject<HTMLElement>,
  customSettings: google.maps.MapOptions,
  mapPoints: IMapPoint[] = [],
): google.maps.Map {
  const apiPromiseRef = useRef(null);
  const [mapsApi, setMapsApi] = useState<typeof google.maps>(null);
  const [map, setMap] = useState<google.maps.Map>(null);
  const [markers, setMarkers] = useState<Record<string, google.maps.Marker>>({});

  useEffect(() => {
    if (!apiPromiseRef.current) {
      const loader = (new GoogleMapLoader({
        apiKey: process.env.APP_GOOGLE_API_KEY,
        version: 'weekly',
      }));
      apiPromiseRef.current = loader.load().then((google) => setMapsApi(google.maps));
    }
  });

  // Create map
  useEffect(() => {
    if (!mapsApi || map) {
      return;
    }

    const createdMap: google.maps.Map = new google.maps.Map(mapRef.current, {
      gestureHandling: 'greedy',
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      center: convertToGoogleMapCoords(DEFAULT_CENTER_COORDINATES),
      zoom: DEFAULT_ZOOM,
      panControl: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      ...customSettings,
    });

    setMap(createdMap);
  }, [map, mapsApi, mapRef]);

  // create custom markers on the map
  useEffect(() => {
    // remove previous markers
    removeMarkers(markers);

    if (map && mapPoints.length) {
      mapPoints.forEach((mapPoint) => {
        markers[mapPoint.id] = new google.maps.Marker({
          position: convertToGoogleMapCoords(mapPoint),
          icon: mapPoint.icon,
          map,
        });
      });
    }
  }, [map, mapPoints]);

  return map;
}
