"use client";

import { useMemo } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  lat: number;
  lng: number;
  title: string;
};

export function ListingMap({ lat, lng, title }: Props) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const initialViewState = useMemo(
    () => ({
      longitude: lng,
      latitude: lat,
      zoom: 11,
    }),
    [lat, lng],
  );

  if (!token) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-white/20 bg-navy-900/50 p-8">
        <p className="text-sm text-slate-400">
          Map preview requires a Mapbox token.{" "}
          <span className="text-slate-300">
            Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
          </span>
        </p>
        <a
          className="inline-flex w-fit rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-chrome/50"
          href={`https://www.google.com/maps?q=${lat},${lng}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="h-[min(28rem,70vh)] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
      <Map
        mapboxAccessToken={token}
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <span
            className="block h-4 w-4 rounded-full border-2 border-white bg-chrome shadow-lg shadow-black/50"
            title={title}
          />
        </Marker>
      </Map>
    </div>
  );
}
