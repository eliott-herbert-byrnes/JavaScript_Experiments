import { loadHTML, updateFooterDate } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/header.html');
    loadHTML('footer', '/footer.html', updateFooterDate);
});