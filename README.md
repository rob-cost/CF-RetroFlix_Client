# RetroFlix

**RetroFlix** is a movie web app built with **React** and styled with **Bootstrap**. It connects to a custom REST API I developed (`RetroFlix_API`) to provide users with detailed movie information, user authentication, and personalized features like favorites and a to-watch list.

You can visit the app here: [retroflixvintage.netlify.app](https://retroflixvintage.netlify.app)

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Getting Started](#getting-started)
- [Interface examples](#interface-examples)

---

## Project Overview

The app allows users to browse a curated list of movies, get detailed info about each film, and manage a personal profile with saved favorites and a watchlist.

---

## Tech Stack

- Frontend: React, Bootstrap, React Router  
- Backend: Node.js & Express (custom API: `RettroFlix_API`)  
- Database: MongoDB (hosted on MongoDB Atlas)  
- Deployment:  
  - Frontend deployed on Netlify  
  - API is also deployed on Heroku

---

## Features

### 1. Login & Signup
- Log in with your username and password  
- Register a new account with username, password, email, birthday, and city

### 2. Main View
- Browse all movies with title, image, and short description  
- Search for a particular movie  
- Add or remove a movie from the favorite or to-watch list  
- Navigate to your profile  
- Log out of your profile

### 3. Single Movie View
- View full movie details including description, genre, director, and actors
- View similar movies

### 4. Profile View
- View and update your user information  
- Check your favorite and to-watch lists


---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/myflixvintage-client.git
cd myflixvintage-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a .env file in the root directory and add your environment variables:
envVITE_API_BASE_URL=http://localhost:8080
#### Add other environment variables as needed


### 4. Start the Development Server

```bash
npm run dev
```
#### or
```bash
yarn dev
```
The app will be available at http://localhost:5173 (or the port shown in your terminal).

### 5. Interface examples

![Screenshot 2025-06-12 at 08 57 51](https://github.com/user-attachments/assets/d17b7291-4aea-48ac-a1e1-7e0c5131e8b0)

![Screenshot 2025-06-12 at 08 57 26](https://github.com/user-attachments/assets/9ed4aff2-0f64-443f-b5f1-82356b712650)

![Screenshot 2025-06-12 at 08 57 40](https://github.com/user-attachments/assets/791da029-d2e5-4412-a0a7-c99e75d876db)





