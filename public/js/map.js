window.onload = function () {
  mapboxgl.accessToken = MAP_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    center: [73.79, 19.9993],
    zoom: 9,
  });

  map.on("load", () => {
    map.resize();
  });
};
