import { posts } from './data/posts.js';
import { loadHTML, updateFooterDate } from './utils.js';

function setupMobileNav() {
    const toggleButton = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleButton && navLinks) {
        toggleButton.addEventListener('click', () => {
            console.log('Hamburger clicked'); 
            navLinks.classList.toggle('active');
        });
    }
}

const viewMoreClick = document.getElementById('viewMoreClick');

// Event listener to load header and footer after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/header.html', () => {
        setupMobileNav(); 
    });
    loadHTML('footer', '/footer.html', updateFooterDate);
    renderHero();
    renderPosts();
    viewMoreClick.addEventListener('click', () => {
        viewMoreClick.style.display = 'none';
        renderViewMore();
    });
});


// Load hero post
function renderHero() {
    const heroContainer = document.getElementById('homeHero');

    const heroPostIndex = posts.filter((post) => post.id === 1)[0];

    const postElement = document.createElement('div');
    postElement.classList.add('hero-post');
    postElement.innerHTML = `
    <a href="/post.html?id=${heroPostIndex.id}" class="hero-link">
        <img src="/img/${heroPostIndex.id}.png" alt="${heroPostIndex.title}"> 
        <p>${new Date(heroPostIndex.date).toLocaleDateString()}</p>
        <h3>${heroPostIndex.title}</h3>
        <p>${heroPostIndex.subheading}</p>
        </a>
    `;
    heroContainer.appendChild(postElement);
    
    console.log(heroPostIndex)
}

function createPostCard(post) {
    const postElements = document.createElement('div');
    postElements.classList.add('postCard');
    postElements.innerHTML = `
        <a href="/post.html?id=${post.id}">
            <img src="/img/${post.id}.png" alt="${post.title}">
        </a>
        <a href="/post.html?id=${post.id}">
        <p>${new Date(post.date).toLocaleDateString()}</p>
            <h3>${post.title}</h3>
        </a>
        <p>${post.subheading}</p>
    `;
    return postElements;
}

function renderPosts() {
    const postsContainer = document.getElementById('homePosts');

    const blogPostIndex = posts.filter((post) => post.id === 2 || post.id === 3 || post.id === 4);

    blogPostIndex.forEach((post) => {
        postsContainer.appendChild(createPostCard(post));
    })
}

function renderViewMore() {
    const viewMoreContainer = document.getElementById('viewMore');

    const blogPostIndex = posts.filter((post) => post.id === 5 || post.id === 6 || post.id === 7);

    blogPostIndex.forEach((post) => {
        viewMoreContainer.appendChild(createPostCard(post));
    })
}