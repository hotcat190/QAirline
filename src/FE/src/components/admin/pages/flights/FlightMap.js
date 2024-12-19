import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaExpand, FaCompress, FaCrosshairs } from "react-icons/fa";
import styles from "./FlightMap.module.css";

// Control component for resetting view
function ResetViewControl({ center, zoom }) {
  const map = useMap();

  const handleReset = () => {
    map.setView(center, zoom);
  };

  return (
    <button
      className={styles.mapButton}
      onClick={handleReset}
      title="Reset to default view"
    >
      <FaCrosshairs />
    </button>
  );
}

// Create a new component for handling bounds
function BoundsHandler({ flights }) {
  const map = useMap();

  useEffect(() => {
    if (flights && flights.length > 0) {
      // Create bounds from all coordinates
      const bounds = flights.reduce((bounds, flight) => {
        bounds.extend(flight.originCoords);
        bounds.extend(flight.destinationCoords);
        return bounds;
      }, new L.LatLngBounds(flights[0].originCoords, flights[0].destinationCoords));

      // Fit the map to these bounds with some padding
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [flights, map]);

  return null;
}

export default function FlightMap({ flights }) {
  const defaultCenter = [16.0474, 108.2062];
  const defaultZoom = 6;
  const mapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const mapContainer = mapRef.current;
    if (!isFullscreen) {
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Fix for marker icon in leaflet
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  return (
    <div className={styles.mapContainer} ref={mapRef}>
      <div className={styles.mapControls}>
        <button
          className={styles.mapButton}
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                /> */}

        <BoundsHandler flights={flights} />

        <div className={styles.resetViewControl}>
          <ResetViewControl center={defaultCenter} zoom={defaultZoom} />
        </div>

        {flights.map((flight) => (
          <div key={flight.id}>
            <CircleMarker
              center={flight.originCoords}
              radius={8}
              fillColor="#ff2626"
              fillOpacity={1}
              color="#ffffff"
              weight={2}
            >
              <Tooltip className={styles.tooltipContent}>
                <div className={styles.tooltipTitle}>{flight.origin}</div>
                <div className={styles.tooltipItem}>
                  Flight: {flight.flightNumber}
                </div>
                <div className={styles.tooltipItem}>
                  Departure: {flight.departureTime}
                </div>
              </Tooltip>
            </CircleMarker>

            <Polyline
              positions={[flight.originCoords, flight.destinationCoords]}
              color="#ff2626"
              weight={2}
              opacity={0.8}
            />

            <CircleMarker
              center={flight.destinationCoords}
              radius={8}
              fillColor="#ffffff"
              fillOpacity={1}
              color="#ff2626"
              weight={2}
            >
              <Tooltip>
                <div className={styles.tooltipTitle}>{flight.destination}</div>
                <div className={styles.tooltipItem}>
                  Flight: {flight.flightNumber}
                </div>
                <div className={styles.tooltipItem}>
                  Arrival: {flight.arrivalTime}
                </div>
              </Tooltip>
            </CircleMarker>
          </div>
        ))}
      </MapContainer>
    </div>
  );
}
