# Twimba 🐦 (Twitter Clone)

A lightweight, dark-themed Twitter clone built with vanilla JavaScript. This project replicates core Twitter functionality including posting tweets, replying, liking, retweeting, commenting, and deleting — all powered by a dynamic in-memory data structure and persisted using `localStorage`.

---

## ✨ Features

- ✅ Compose and post new tweets
- 💬 Toggle replies and comment threads per tweet
- ❤️ Like / Unlike tweets
- 🔁 Retweet / Un-retweet tweets
- 🗑️ Delete your own tweets
- 💾 Data persistence using `localStorage`
- 🎨 Responsive dark mode UI inspired by modern Twitter
- 🧠 Modular rendering logic using dynamic `data-*` attributes

---

## 🧩 Tech Stack

| Tech           | Purpose                          |
|----------------|----------------------------------|
| **HTML/CSS**   | Markup and styling               |
| **Vanilla JS** | DOM interaction & logic handling |
| **localStorage** | Persistent client-side data     |
| **UUID**       | Unique tweet identification via [uuid](https://jspm.dev/uuid) |
| **Font Awesome** | Icons for interaction buttons   |

---

## 🏗️ Project Structure
twitter_clone/ │ ├── index.html # Core structure and assets ├── index.css # All dark theme styling ├── index.js # Main app logic and UI handling ├── data.js # Default tweet dataset (loaded on first use) └── images/ # Profile pictures and assets

---

## 📂 Components Explained

### 🧠 `tweetsData` (Core state)
All tweet content lives in this array. Tweets contain:
- `uuid`: unique identifier
- `handle`: user handle
- `profilePic`: avatar image path
- `tweetText`: tweet content
- `likes`, `retweets`: integers
- `isLiked`, `isRetweeted`: booleans
- `replies`: array of reply objects
- `isUser`: boolean to determine if tweet was authored by the current user

### 💡 Interaction Functions

- `handleTweetBtnClick()` – Creates new tweet with default user info
- `handleLikeClick()` – Toggles like status and count
- `handleRetweetClick()` – Toggles retweet status and count
- `handleReplyClick()` – Toggles reply thread visibility
- `handleCommentClick()` – Toggles comment input visibility
- `handleAddComment()` – Adds comment to `replies` array
- `handleDeleteTweet()` – Removes a tweet from `tweetsData` via `.splice()`

### 📦 Persistence

- Tweets are stored and updated in `localStorage` under the key `"tweetsData"`.
- If no data is found, fallback data from `data.js` is imported dynamically.

### 🧱 `getTweetInteractionBar()`
A helper function used to render the interactive icons (`like`, `retweet`, `reply`, `delete`) dynamically based on tweet state and user ownership.

---

## 🧪 Future Improvements

- Edit tweet functionality
- Basic user login simulation
- Time/date display per tweet
- Real-time syncing between tabs
- Mobile responsiveness

---

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/eliott-herbert-byrnes/JavaScript_Experiments.git

