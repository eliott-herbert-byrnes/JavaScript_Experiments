import { loadHTML, updateFooterDate } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/header.html', () => {
        setupMobileNav(); 
    });
    loadHTML('footer', '/footer.html', updateFooterDate);
});

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