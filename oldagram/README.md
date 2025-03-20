# Oldagram

- Oldagram is a simple social media feed inspired by Instagram, built with HTML, CSS, and JavaScript. 
- The application dynamically generates user posts and allows users to interact with the content by liking posts.

## Features

- Dynamic Post Rendering: Posts are stored in an array and rendered dynamically using JavaScript.
- Like Functionality: Users can click the heart icon to like a post, and the like count updates instantly.
- One-Time Like Limit: Users can only like each post once to prevent spamming.
- Minimalist Design: Styled using CSS for a clean and simple user interface.

## Tech Stack
- HTML - Structuring the content
- CSS - Styling the UI
- JavaScript

## Project Structure

- Rendering Posts:

The posts array stores post data, including usernames, locations, avatars, images, comments, and likes.
The postGenerator function loops through the array and injects HTML elements into the DOM.

- Like Button Interaction:

The heart icon (.icon-1) is clickable.
When clicked, the likes value for that post increases by 1.
The UI updates dynamically without refreshing the page.
Users can only like each post once using a liked flag.

## Installation & Usage

- Clone the repository:
- Open index.html in a browser.
- Click the heart icon to like posts and see the count update in real-time.

## Future Improvements

- Persistent Likes: Store likes in localStorage so they remain after page reload.
- Commenting System: Allow users to add comments.
- Post Uploads: Let users add their own posts.
