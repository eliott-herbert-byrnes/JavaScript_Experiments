import { posts } from './data/posts.js';

async function loadHTML(id, url, callback) {
    const response = await fetch(url);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
    if (callback) callback();
}

function updateFooterDate() {
    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
        footerDate.textContent = new Date().getFullYear();
    }
}

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
}

function renderFeatures(features) {
    return features ? features.map(feature => `<li>${feature}</li>`).join('') : 'Coming soon';
}

function renderStack(stack) {   
    return stack ? stack.map(item => `<li>${item}</li>`).join('') : 'Coming soon';
}

function renderPost() {
    const postId = getPostIdFromURL();
    const post = posts.find(p => p.id === postId);

    if (!post) {
        document.getElementById('postContent').innerHTML = '<p>Post not found.</p>';
        return;
    }

    const postContent = document.getElementById('postContent');
    postContent.innerHTML = `
        <div class="post-container">
            <p>${new Date(post.date).toLocaleDateString()}</p>
            <h2>${post.title}</h2>
            <p>${post.subheading}</p>
            <img src="/img/${post.id}.png" alt="${post.title}" />
            <h3>Features:</h3>
            ${renderFeatures(post.features)}
            <h3>Stack:</h3>
            ${renderStack(post.stack)}
        </div>
    `;
}

function createPostCard(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('postCard');
    postElement.innerHTML = `
    <div class="singlePostCardContainer">
        <a href="/post.html?id=${post.id}">
            <img src="/img/${post.id}.png" alt="${post.title}">
        </a>
        <a href="/post.html?id=${post.id}">
            <p>${new Date(post.date).toLocaleDateString()}</p>
            <h3>${post.title}</h3>
            <p>${post.subheading}</p>
        </a>
    </div>
    `;
    return postElement;
}

function renderRecentPosts() {
    const recentPostsContainer = document.getElementById('recentPosts');
    const currentPostId = getPostIdFromURL();

    const recentPosts = posts
        .filter(post => post.id !== currentPostId)
        .slice(0, 3);

    if (recentPosts.length === 0) {
        recentPostsContainer.innerHTML = '<p>No recent posts available.</p>';
        return;
    }

        recentPosts.forEach(post => {
            recentPostsContainer.appendChild(createPostCard(post));
    }); 
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/header.html');
    loadHTML('footer', '/footer.html', updateFooterDate);
    renderPost();
    renderRecentPosts();
});