import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Aircraft, MissionStage, Waypoint } from '../types';

// Define marker props interface
interface CustomMarkerProps extends L.MarkerOptions {
  position: L.LatLngExpression;
  icon?: L.Icon<AircraftIconOptions>;
  rotationAngle?: number;
  children?: React.ReactNode;
}

// Define specific options for our aircraft icon
interface AircraftIconOptions extends L.IconOptions {
  iconUrl: string;
  iconSize: L.PointExpression;
  iconAnchor: L.PointExpression;
  popupAnchor: L.PointExpression;
  className?: string;
}

// Create a custom marker component
const CustomMarker: React.FC<CustomMarkerProps> = ({ position, icon, rotationAngle, children }) => (
  <Marker 
    position={position} 
    icon={icon} 
    {...(rotationAngle ? { rotationAngle } : {})}
  >
    {children}
  </Marker>
);

// Create a custom icon class with specific options
class AircraftIcon extends L.Icon<AircraftIconOptions> {
  constructor(options: AircraftIconOptions) {
    super(options);
  }
}

// Create custom icons for different aircraft statuses
const createAircraftIcon = (color: string, isBlinking: boolean = false): L.Icon<AircraftIconOptions> => {
  const iconOptions: AircraftIconOptions = {
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 5 L25 25 L15 20 L5 25 L15 5" fill="${color}" stroke="white"/>
      </svg>
    `),
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
    className: isBlinking ? 'blinking-marker' : ''
  };
  return new AircraftIcon(iconOptions);
};

const icons: { [key: string]: L.Icon<AircraftIconOptions> } = {
  'Operational': createAircraftIcon('#10B981'), // green-500
  'In Mission': createAircraftIcon('#3B82F6', true), // blue-500
  'default': createAircraftIcon('#EAB308')  // yellow-500
};

interface AircraftMapProps {
  aircraft: Aircraft[];
}

interface AnimatedAircraft {
  id: string;
  position: L.LatLng;
  altitude: number;
  heading: number;
  currentWaypoint: number;
  currentStage: MissionStage;
}

interface ExtendedMarkerProps extends L.MarkerOptions {
  rotationAngle?: number;
}

const AircraftMap: React.FC<AircraftMapProps> = ({ aircraft }) => {
  const [animatedAircraft, setAnimatedAircraft] = useState<{ [key: string]: AnimatedAircraft }>({});

  const mapProps = {
    center: [41.123, -111.973] as L.LatLngExpression,
    zoom: 15,
    style: { height: '100%', width: '100%' }
  };

  useEffect(() => {
    // Set up animation for aircraft in mission
    const inMissionAircraft = aircraft.filter(a => a.status === 'In Mission');
    
    const animationFrame = setInterval(() => {
      setAnimatedAircraft(prev => {
        const updated = { ...prev };
        
        inMissionAircraft.forEach(a => {
          if (!a.currentMission) return;
          
          const currentStage = a.currentMission.stages.find((s: MissionStage) => s.status === 'In Progress');
          if (!currentStage) return;

          let current = updated[a.id] || {
            id: a.id,
            position: new L.LatLng(a.locationLat, a.locationLng),
            altitude: currentStage.waypoints[0].altitude,
            heading: 0,
            currentWaypoint: 0,
            currentStage
          };

          // Calculate next position
          const nextWaypoint = currentStage.waypoints[current.currentWaypoint + 1] || currentStage.waypoints[0];
          const speed = 0.0001; // Adjust for animation speed

          // Move towards next waypoint
          const dx = nextWaypoint.lng - current.position.lng;
          const dy = nextWaypoint.lat - current.position.lat;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < speed) {
            // Reached waypoint, move to next
            current.currentWaypoint = (current.currentWaypoint + 1) % currentStage.waypoints.length;
          } else {
            // Update position
            const newLng = current.position.lng + (dx / distance) * speed;
            const newLat = current.position.lat + (dy / distance) * speed;
            current.position = new L.LatLng(newLat, newLng);
            
            // Update heading
            current.heading = (Math.atan2(dy, dx) * 180) / Math.PI;
            
            // Interpolate altitude
            const altitudeDiff = nextWaypoint.altitude - current.altitude;
            current.altitude += (altitudeDiff / distance) * speed;
          }

          updated[a.id] = current;
        });

        return updated;
      });
    }, 50); // Update every 50ms

    return () => clearInterval(animationFrame);
  }, [aircraft]);

  return (
    <MapContainer {...mapProps}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {aircraft.map((a) => {
        const animated = animatedAircraft[a.id];
        const position = animated ? 
          [animated.position.lat, animated.position.lng] as L.LatLngExpression :
          [a.locationLat, a.locationLng] as L.LatLngExpression;

        // Draw flight path for aircraft in mission
        if (a.status === 'In Mission' && a.currentMission) {
          const currentStage = a.currentMission.stages.find((s: MissionStage) => s.status === 'In Progress');
          if (currentStage) {
            return (
              <React.Fragment key={a.id}>
                <Polyline
                  positions={currentStage.waypoints.map((w: Waypoint) => [w.lat, w.lng])}
                  color="#3b82f6"
                  dashArray="5,10"
                />
                <CustomMarker
                  position={position}
                  icon={icons[a.status]}
                  rotationAngle={animated?.heading || 0}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold">{a.tailNumber}</h3>
                      <p className="text-sm">{a.model}</p>
                      <p className="text-sm mt-1">Status: {a.status}</p>
                      <p className="text-sm">Altitude: {Math.round(animated?.altitude || 0)} ft</p>
                      <p className="text-sm">Current Stage: {currentStage.name}</p>
                    </div>
                  </Popup>
                </CustomMarker>
              </React.Fragment>
            );
          }
        }

        return (
          <CustomMarker
            key={a.id}
            position={position}
            icon={icons[a.status] || icons.default}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{a.tailNumber}</h3>
                <p className="text-sm">{a.model}</p>
                <p className="text-sm mt-1">Status: {a.status}</p>
                <p className="text-sm">Location: {a.location}</p>
              </div>
            </Popup>
          </CustomMarker>
        );
      })}
    </MapContainer>
  );
};

export default AircraftMap; 