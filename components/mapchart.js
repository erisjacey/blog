import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

const MapChart = () => {
  const [content, setContent] = useState('');

  return (
    <>
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    setContent('');
                  }}
                  style={{
                    default: {
                      fill: "#EEE",
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
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip content={content} />
    </>
  )
};

export default MapChart;
