import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import NoSsr from '@/components/nossr';
import { countries, markers } from '@/lib/constants';

const GEO_URL =
  'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

const MapChart = () => {
  const [content, setContent] = useState('');

  return (
    <>
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  data-tooltip-id="my-tooltip"
                  geography={geo}
                  onMouseEnter={() => {
                    setContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    setContent('');
                  }}
                  style={{
                    default: {
                      fill: countries.has(geo.properties.name) ? "#0F0" : "#EEE",
                    },
                    hover: {
                      fill: "#F53",
                    },
                    pressed: {
                      fill: "#E42",
                    },
                  }}
                  stroke="#000000"
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={1.3} fill="#F00" stroke="#fff" strokeWidth={0.5} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "4" }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <NoSsr>
        <Tooltip id="my-tooltip" content={content} />
      </NoSsr>
    </>
  )
};

export default MapChart;
