# RetroFlix

**RetroFlix** is a single-page movie web app built with **React** and styled with **Bootstrap**. It connects to a custom REST API I developed (`RetroFlix_API`) to provide users with detailed movie information, user authentication, and personalized features like favorites and a to-watch list.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Getting Started](#getting-started)

---

## Project Overview

The app allows users to browse a curated list of movies, get detailed info about each film, and manage a personal profile with saved favorites and a watchlist.

---

## Tech Stack

- Frontend: React, Bootstrap, React Router  
- Backend: Node.js & Express (custom API: `RettroFlix_API`)  
- Database: MongoDB (hosted on MongoDB Atlas)  
- Deployment:  
  - Frontend deployed on Heroku  
  - API is also deployed on Heroku

---

## Features

#1. Login & Signup
    - Log in with your username and password
    - Register a new account with username, password, email, birthday, and city

#2. Main View
    - Browse all movies with title, image, and short description
    - Search for a particular movie
    - Add or remove a movie from the favorite or to-watch list
    - Navigate to your profile
    - Log out of the profile
    
#3. Single Movie View
    - See full details (description, genre, director, actors, etc.)  
    
#4. Profile View
    - See and update your info
    - Check your favorite and to-watch list

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

### 3. Start the app

```bash
npm start
```
