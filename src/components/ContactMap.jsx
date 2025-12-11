import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { useMemo, useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "1.5rem",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

// "Black, White, Gray & Green" Theme
const mapStyles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      { saturation: -100 }, // Grayscale base
      { lightness: 10 },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#e9e9e9" }, // Light Gray Water
      { lightness: 17 },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      { color: "#f5f5f5" }, // White/Gray Landscape
      { lightness: 20 },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }, { lightness: 17 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }, { lightness: 18 }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }, { lightness: 16 }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#dedede" }, // Slightly darker gray for parks
      { lightness: 21 },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      { saturation: 36 },
      { color: "#333333" }, // Dark Gray Text
      { lightness: 40 },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
];

export default function ContactMap({ locations = [] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = useState(null);

  const center = useMemo(() => {
    if (
      locations &&
      locations.length > 0 &&
      locations[0].lat &&
      locations[0].long
    ) {
      return {
        lat: parseFloat(locations[0].lat),
        lng: parseFloat(locations[0].long),
      };
    }
    return defaultCenter;
  }, [locations]);

  // Fit bounds
  useEffect(() => {
    if (map && locations.length > 0 && isLoaded && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      let hasValidLoc = false;
      locations.forEach((loc) => {
        if (loc.lat && loc.long) {
          bounds.extend({
            lat: parseFloat(loc.lat),
            lng: parseFloat(loc.long),
          });
          hasValidLoc = true;
        }
      });
      if (hasValidLoc) {
        map.fitBounds(bounds);
      }
    }
  }, [map, locations, isLoaded]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onUnmount = () => {
    setMap(null);
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">
        Loading Map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        styles: mapStyles,
      }}
    >
      {locations.map(
        (loc) =>
          loc.lat &&
          loc.long && (
            <MarkerF
              key={loc.id}
              position={{ lat: parseFloat(loc.lat), lng: parseFloat(loc.long) }}
              title={loc.branchname}
              icon={{
                // Custom Leaf Icon
                path: "M17.09,2.22C16.68,2.05,12.92,1.96,10,3.13C7.03,4.32,4.89,7.49,4.89,10.03c0,2.15,1.26,5.32,4.2,7.3c-.02,.27-.04,.54-.04,.82c0,3,.5,4.04,.5,4.04s.82-1.74,1.98-4.2c1.77-.37,3.6-1.5,4.92-3.3c1.54-2.1,1.76-5.33,1.76-5.33S19.5,4,17.09,2.22z",
                fillColor: "#16a34a", // Green Leaf
                fillOpacity: 1,
                strokeWeight: 1,
                strokeColor: "#ffffff", // White outline
                scale: 2, // Larger Leaf
                anchor: new window.google.maps.Point(12, 22),
              }}
            />
          ),
      )}
    </GoogleMap>
  );
}
