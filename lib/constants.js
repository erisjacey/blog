// Map chart

const countries = new Set();
countries.add('Indonesia');
countries.add('Japan');
countries.add('Malaysia');
countries.add('South Korea');
countries.add('Vietnam');

const markers = [
  { markerOffset: 5, name: "Seoul", coordinates: [127.3, 37.5] },
  { markerOffset: 8.5, name: "Tioman", coordinates: [104.3, 2.8] },
  { markerOffset: 5, name: "Bali", coordinates: [116, -8.5] },
  { markerOffset: 9, name: "Osaka", coordinates: [135.3, 34.5] },
  { markerOffset: 5, name: "Hanoi", coordinates: [106, 21.2] },
];

// Tabs
const topics = new Set();
topics.add('food');
topics.add('shows');
topics.add('things');
topics.add('travel');

export {
  countries,
  markers,
  topics,
};
