import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import NoSsr from '@/components/nossr';
import { countries } from '@/lib/constants';

const GEO_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

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
        </ZoomableGroup>
      </ComposableMap>
      <NoSsr>
        <Tooltip id="my-tooltip" content={content} />
      </NoSsr>
    </>
  )
};

export default MapChart;
