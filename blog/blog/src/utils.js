export async function loadHTML(id, url, callback) {
    const response = await fetch(url);
    const content = await response.text();
    document.getElementById(id).innerHTML = content;

    // Wait for DOM paint before running callback
    if (callback) {
        requestAnimationFrame(() => {
            callback();
        });
    }
}

// Function to update the footer date dynamically
export function updateFooterDate() {
    const footerDate = document.getElementById('footerDate');
    if (footerDate) {
        footerDate.textContent = new Date().getFullYear();
    }
}