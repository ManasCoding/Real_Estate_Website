# PDR Real Estate Platform

A premium, full-stack real estate web application built with a modern React frontend and a robust Node.js backend. The platform provides a dynamic and highly-styled landing page for prospective buyers and sellers, alongside a fully integrated admin dashboard for managing property listings and uploading property images.

![PDR Real Estate](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Key Features
*   **Stunning UI/UX:** Built with React, Tailwind CSS, shadcn/ui, and Framer Motion for buttery-smooth animations and glassmorphism styling.
*   **Property Management Dashboard:** A dedicated, fully functional admin panel to append new properties to the database seamlessly.
*   **Full-Stack Architecture:** Distinct separation of concerns between the robust `backend/` and slick `front-end/` workspaces.
*   **Dynamic Data & Media:** Stores property data using MongoDB and securely handles localized real-estate image uploads via Multer.
*   **Fully Responsive:** Designed from the ground up to render flawlessly on mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

**Front-End**
*   [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Framer Motion](https://www.framer.com/motion/) (Animations)
*   [Shadcn UI](https://ui.shadcn.com/) (Component Library)

**Backend**
*   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) (Database ORM)
*   [Multer](https://www.npmjs.com/package/multer) (File Upload Handling)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
Make sure you have Node.js and npm installed on your machine.
You will also need a MongoDB Database connection string.

### 1. Backend Setup

Open a terminal and configure the backend server:

```bash
cd backend
npm install
```

**Environment Variables**
Create a `.env` file in the `backend/` directory and configure the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

**Start the Server**
```bash
node server.js
```
*The backend should now be listening on `http://localhost:5000`.*

### 2. Front-End Setup

Open a new, separate terminal and configure the React frontend:

```bash
cd front-end
npm install
```

**Start the Client**
```bash
npm run dev
```
*The app should now be running cleanly on `http://localhost:5173`.*

---

## 📂 Project Structure

```text
Real_Estate_Website/
│
├── backend/                  # Express server & API routes
│   ├── models/               # Mongoose schemas (Property.js)
│   ├── routes/               # API endpoint configurations (adminRoutes.js)
│   ├── uploads/              # Local server multer storage for property images
│   ├── server.js             # Main server entrypoint
│   └── .env                  # Backend secrets / settings
│
├── front-end/                # Vite React client
│   ├── src/
│   │   ├── components/       # Reusable UI components & shadcn library elements
│   │   ├── pages/            # Page-level components including the Admin Dashboard
│   │   ├── sections/         # Feature blocks constructing the landing page logic
│   │   ├── icons/            # SVG icons
│   │   ├── App.tsx           # Global app structure & layout
│   │   └── main.tsx          # React-DOM mount point & Routing config
│   │
│   ├── tailwind.config.ts    # Custom branding, colors, and layout configurations
│   └── package.json          # Front-end dependencies
│
└── README.md
```

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/ManasCoding/Real_Estate_Website/issues) to start contributing.

## 📝 License
This project is [MIT](https://opensource.org/licenses/MIT) licensed.
