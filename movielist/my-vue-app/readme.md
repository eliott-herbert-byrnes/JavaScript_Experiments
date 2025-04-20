# 🎬 Movie Finder App

A responsive, minimalist movie search application powered by the [OMDb API](https://www.omdbapi.com/). Users can search for films by title, view full details including rating, runtime, genre, and plot, and add movies to a persistent watchlist using `localStorage`.

---

## ✨ Features

- 🔍 **Search for Movies** by title using the OMDb API
- 🎞 **View Movie Details** including poster, rating, runtime, genre, and plot
- 📌 **Add to Watchlist** with a single click
- 💾 **Persistent Storage** using `localStorage` (watchlist remains between page reloads)
- 🧭 **Responsive UI** designed with clean HTML, CSS, and vanilla JavaScript

---

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- [OMDb API](https://www.omdbapi.com/)
- LocalStorage (no backend)

---

## 🚀 Getting Started

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/movie-finder.git
cd movie-finder
```

---

## 🧠 Project Structure
```bash
📁 movie-finder/
│
├── 📄 index.html            # Main search page
├── 📄 watchlist.html        # Watchlist display page
├── 📁 src/
│   ├── main.js              # Handles search, API fetch, DOM rendering
│   └── watchlist.js         # Loads saved watchlist from localStorage
│
├── 📁 img/                  # Icons & placeholder images
├── 📄 style.css             # Global styles
└── 📄 README.md             # Project description
```

---
## 📦 LocalStorage Schema
```json
[
  {
    "imdbID": "tt0083658",
    "Poster": "https://...",
    "Title": "Blade Runner",
    "imdbRating": "8.1",
    "Runtime": "117 min",
    "Genre": "Action, Sci-Fi",
    "Plot": "A blade runner must pursue and terminate..."
  }
]

```
---
## 📌 Upcoming Improvements
- ✏️ Editable and removable watchlist
- 💡 Loading spinners and better error handling
- 📱 Improved mobile styling
- 🌐 Deploy to GitHub Pages or Netlify
