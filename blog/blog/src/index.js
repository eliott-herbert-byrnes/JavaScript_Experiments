// Dynamic loading of header and footer HTML content
async function loadHTML(id, url, callback) {
    const response = await fetch(url);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;
    if (callback) callback();
}

// Function to update the footer date dynamically
function updateFooterDate() {
    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
        footerDate.textContent = new Date().getFullYear();
    }
}

// Event listener to load header and footer after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('header', '/header.html');
    loadHTML('footer', '/footer.html', updateFooterDate);
});
