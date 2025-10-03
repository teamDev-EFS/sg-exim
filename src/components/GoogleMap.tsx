import React, { useEffect, useRef } from "react";

// Google Maps type declarations
declare global {
  interface Window {
    google: any;
  }
}

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
  markerTitle?: string;
  height?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom = 15,
  className = "",
  markerTitle = "Our Location",
  height = "400px",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) {
        console.error(
          "Google Maps: Map container or Google Maps API not available"
        );
        return;
      }

      try {
        // Initialize map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        // Add marker
        markerRef.current = new window.google.maps.Marker({
          position: center,
          map: mapInstanceRef.current,
          title: markerTitle,
          animation: window.google.maps.Animation.DROP,
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 10px;"><strong>${markerTitle}</strong><br>Lat: ${center.lat.toFixed(
            6
          )}, Lng: ${center.lng.toFixed(6)}</div>`,
        });

        markerRef.current.addListener("click", () => {
          infoWindow.open(mapInstanceRef.current, markerRef.current);
        });
      } catch (error) {
        console.error("Google Maps: Error initializing map:", error);
        // Show fallback content
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">📍</div>
              <div style="font-weight: 600; margin-bottom: 5px;">${markerTitle}</div>
              <div style="color: #6b7280; font-size: 14px;">Lat: ${center.lat.toFixed(
                6
              )}, Lng: ${center.lng.toFixed(6)}</div>
              <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">
                <a href="https://maps.google.com/?q=${center.lat},${
            center.lng
          }" target="_blank" style="color: #3b82f6; text-decoration: none;">
                  Open in Google Maps
                </a>
              </div>
            </div>
          `;
        }
      }
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const apiKey =
        (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
        "AIzaSyDoy4xd7POgSrkLzxi8Z3b5DT4nrDA-zmw";

      if (!apiKey) {
        console.error(
          "Google Maps: API key not found. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables."
        );
        // Show fallback content
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">📍</div>
              <div style="font-weight: 600; margin-bottom: 5px;">${markerTitle}</div>
              <div style="color: #6b7280; font-size: 14px;">Lat: ${center.lat.toFixed(
                6
              )}, Lng: ${center.lng.toFixed(6)}</div>
              <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">
                <a href="https://maps.google.com/?q=${center.lat},${
            center.lng
          }" target="_blank" style="color: #3b82f6; text-decoration: none;">
                  Open in Google Maps
                </a>
              </div>
            </div>
          `;
        }
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeMap();
      };
      script.onerror = (error) => {
        console.error("Google Maps: Error loading script:", error);
        // Show fallback content with billing error info
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; text-align: center;">
              <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
              <div style="font-weight: 600; margin-bottom: 5px; color: #92400e;">${markerTitle}</div>
              <div style="color: #92400e; font-size: 14px; margin-bottom: 10px;">Google Maps requires billing to be enabled</div>
              <div style="color: #6b7280; font-size: 12px; margin-bottom: 10px;">Lat: ${center.lat.toFixed(
                6
              )}, Lng: ${center.lng.toFixed(6)}</div>
              <div style="color: #6b7280; font-size: 12px;">
                <a href="https://maps.google.com/?q=${center.lat},${
            center.lng
          }" target="_blank" style="color: #3b82f6; text-decoration: none;">
                  Open in Google Maps
                </a>
              </div>
            </div>
          `;
        }
      };
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [center, zoom, markerTitle]);

  return (
    <div
      ref={mapRef}
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ height }}
    />
  );
};

export default GoogleMap;
