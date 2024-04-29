import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import {City, Points, Point, MapSize} from '../../types/types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
  mapSize: MapSize;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map(props: MapProps): JSX.Element {
  const {city, points, selectedPoint, mapSize} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {

      map.eachLayer((layer) => {
        if (layer instanceof Marker) {
          map.removeLayer(layer);
        }
      });


      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.name === selectedPoint.name
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });
      if (selectedPoint !== undefined){
        map.setView([selectedPoint.location.latitude, selectedPoint.location.longitude],  selectedPoint.location.zoom);
      } else{
        map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      }
      
    }
  }, [map, city, points, selectedPoint]);

  return <div style={mapSize} ref={mapRef}></div>;
}

export default Map;
