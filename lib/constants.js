// Map chart

const countries = new Set();
countries.add('Indonesia');
countries.add('South Korea');
countries.add('Malaysia');

const markers = [
  { markerOffset: 7, name: "Bali", coordinates: [116, -8.5] },
];

// Tabs
const topics = new Set();
topics.add('food');
topics.add('shows');
topics.add('travel');

export {
  countries,
  markers,
  topics,
};
