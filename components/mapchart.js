import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { capitalisePhrase, idStrToArr, getBlogType1FromIdArr, getBlogType2FromIdArr } from '@/lib/utils';

const GEO_URL =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

const TRAVEL = 'travel';

const MapChart = ({ posts }) => {
  const [content, setContent] = useState('');

  const getAllCountries = (posts) => (
    new Set(posts
      .filter((post) => {
        const idArr = idStrToArr(post.id);
        return getBlogType1FromIdArr(idArr) === TRAVEL;
      })
      .map((post) => {
        const idArr = idStrToArr(post.id);
        const type2 = getBlogType2FromIdArr(idArr); // Format: countryNameYear
        return capitalisePhrase(type2.replace(/[0-9]/g, '').replace('-', ' '));
      })
  ));

  const countries = getAllCountries(posts);

  return (
    <>
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup center={[0, 0]} zoom={1}>
          <Geographies geography={GEO_URL}>
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
      <Tooltip content={content} />
    </>
  )
};

export default MapChart;
