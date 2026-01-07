window.onload = function () {
  mapboxgl.accessToken = MAP_TOKEN;

  const lngLat = [Number(coordinates[0]), Number(coordinates[1])];

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: lngLat,
    zoom: 9,
  });

  map.on("load", () => {
    map.resize();

    // STEP 2 STARTS HERE 👇

    const el = document.createElement("div");
    el.className = "airbnb-map-marker";
    el.innerHTML = `<i class="fa-brands fa-airbnb"></i>`;

    const popup = new mapboxgl.Popup({
      offset: 25,
    }).setHTML("<h4>Exact location provided on booking.!</h4>");

    new mapboxgl.Marker(el).setLngLat(lngLat).setPopup(popup).addTo(map);

    // STEP 2 ENDS HERE 👆
  });
};
