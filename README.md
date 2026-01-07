# 📍 MiniAirBnB

MiniAirBnB is a **full-stack clone of Airbnb** built with **Node.js, Express, MongoDB, Passport authentication, and Mapbox for interactive maps**.
It aims to mimic key features of Airbnb, including user accounts, listings with locations, reviews, image uploads, and map visualization.

🔗 Live demo : ([https://miniairbnb-ouv9.onrender.com/lisitngs](https://miniairbnb-ouv9.onrender.com/listings)) (see project homepage) ([GitHub][1])

---

## 🧠 Features

✔ User Authentication (register/login/logout)
✔ Passport + Local Strategy + Session Management
✔ Listings with title, images, price, description, country
✔ Geolocation with interactive **Mapbox** markers
✔ Reviews for listings
✔ Role-based access (owners, users)
✔ Image upload integration (Cloudinary ready)
✔ Environment-aware config (local & Atlas)

---

## 🧱 Tech Stack

| Layer        | Technology                   |
| ------------ | ---------------------------- |
| Backend      | Node.js + Express            |
| Database     | MongoDB (Atlas or local)     |
| ORM          | Mongoose                     |
| Views        | EJS Templates                |
| Auth         | Passport.js (Local Strategy) |
| Maps         | Mapbox GL JS                 |
| File Uploads | Cloudinary / Multer          |
| Deployment   | Vercel / Render / Railway    |
| Styling      | CSS + Font Awesome           |

---

## 📦 Getting Started

### 📌 Prerequisites

Before running the app locally you need:

* Node.js (v20 recommended)
* MongoDB (local or Atlas)
* Mapbox account & access token
* Cloudinary account (optional for uploads)

---

## 🛠 Installation

1. **Clone the repo**

```bash
git clone https://github.com/yyyuvvvraj/MiniAirBnB.git
cd MiniAirBnB
```

2. **Install dependencies**

```bash
npm install
```

---

## 🗝 Environment Setup

Create a `.env` file in the project root:

```
ATLASDB_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
MAP_TOKEN=your_mapbox_api_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

> Replace each placeholder with your actual credentials.

---

## 🧾 Database Seeding

An `init/` folder contains a seed script to populate your database with sample listings:

```bash
cd init
node index.js
```

This script deletes existing listings and inserts sample data with proper geolocation.

---

## 🚀 Running the Project

Start the server:

```bash
nodemon app.js
```

Visit in your browser:

```
http://localhost:8080
```

---

## 🔍 Project Structure

```
MiniAirBnB/
├── init/                     # Database seed scripts
├── controllers/              # Controller logic
├── models/                   # Mongoose models
├── routes/                   # Express route handlers
├── views/                    # EJS view templates
├── public/                   # Static assets (CSS/JS/Images)
├── middleware.js             # Custom Express middleware
├── schema.js                 # Joi validation schemas
├── cloudConfig.js            # Cloudinary config
├── app.js                    # App entrypoint
├── .env                      # Environment variables
```

---

## 🗺 Mapbox Integration

MiniAirBnB uses **Mapbox GL JS** for map rendering and markers.
Each listing’s location is geocoded to coordinates and displayed on the map.

To set up Mapbox:

1. Create a Mapbox account → [https://www.mapbox.com](https://www.mapbox.com)
2. Get an API token
3. Add `MAP_TOKEN` to your `.env`

---

## 📸 Images & Uploads

Cloudinary is configured for image uploads.
Make sure you have your Cloudinary credentials in your `.env`.

Upload middleware (`cloudConfig.js`) handles file processing.

---

## 🧑‍💻 Authentication

Uses **Passport.js local strategy**:

* Register with username + password
* Login / logout
* Session stored in MongoDB via `connect-mongo`

Flash messages show success/error feedback.

---

## 📝 Routes Overview

| Path                    | Purpose             |
| ----------------------- | ------------------- |
| `/`                     | Home / Landing      |
| `/listings`             | List all listings   |
| `/listings/new`         | Create new listing  |
| `/listings/:id`         | View listing detail |
| `/listings/:id/edit`    | Edit listing        |
| `/listings/:id/reviews` | Add reviews         |
| `/users/register`       | Register            |
| `/users/login`          | Login               |

---

## 💻 Validations

Requests are validated using Joi schemas defined in `schema.js` and applied via middleware.

---

## 🛡 Error Handling

All errors are funneled to the global error handler.
Custom `ExpressError` wraps status codes and messages.

---

## 🧪 Deployment

You can deploy this app to services like **Render**, **Railway**, or **Vercel**:

* Push to GitHub
* Add environment variables in the host UI
* Set start command: `node app.js` or `npm start`

---

## 🧑‍🤝‍🧑 Contributors

Created by **yyyuvvvraj** — feel free to star ⭐ and contribute.

---

## 📜 License

This project is open-source — customize and improve as you like!



[1]: https://github.com/yyyuvvvraj/MiniAirBnB "GitHub - yyyuvvvraj/MiniAirBnB"
