require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

// 📍 Location → [lng, lat]
const locationCoordinates = {
  Malibu: [-118.7798, 34.0259],
  "New York City": [-74.006, 40.7128],
  Aspen: [-106.837, 39.1911],
  Florence: [11.2558, 43.7696],
  Portland: [-122.6765, 45.5231],
  Cancun: [-86.8515, 21.1619],
  "Lake Tahoe": [-120.0324, 39.0968],
  "Los Angeles": [-118.2437, 34.0522],
  Verbier: [7.2286, 46.0961],
  "Serengeti National Park": [34.6857, -2.3333],
  Amsterdam: [4.9041, 52.3676],
  Fiji: [178.065, -17.7134],
  Cotswolds: [-1.8433, 51.833],
  Boston: [-71.0589, 42.3601],
  Bali: [115.1889, -8.4095],
  Banff: [-115.5708, 51.1784],
  Miami: [-80.1918, 25.7617],
  Phuket: [98.3923, 7.8804],
  "Scottish Highlands": [-4.2026, 57.12],
  Dubai: [55.2708, 25.2048],
  Montana: [-110.3626, 46.8797],
  Mykonos: [25.3289, 37.4467],
  "Costa Rica": [-84.0907, 9.7489],
  Charleston: [-79.9311, 32.7765],
  Tokyo: [139.6917, 35.6895],
  "New Hampshire": [-71.5724, 43.1939],
  Maldives: [73.2207, 3.2028],
};

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("MongoDB connected");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const fixedData = initData.data.map((obj) => {
    const coords = locationCoordinates[obj.location] || [0, 0];

    return {
      ...obj,
      owner: "695e3d68c040ccdcb64739ea",
      geometry: {
        type: "Point",
        coordinates: coords, // [lng, lat]
      },
    };
  });

  await Listing.insertMany(fixedData);
  console.log("Data was initialized");
};

main()
  .then(initDB)
  .catch((err) => console.log(err));
