import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

declare module 'react-leaflet' {
  interface MapContainerProps {
    center: L.LatLngExpression;
    zoom: number;
    children: React.ReactNode;
  }

  interface TileLayerProps {
    url: string;
    attribution: string;
  }

  interface MarkerProps {
    position: L.LatLngExpression;
    icon?: L.Icon;
  }
} 