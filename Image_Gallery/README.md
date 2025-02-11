# Image Gallery Overview
- Declare a const array listing the filenames of each image, such as 'pic1.jpg'.
- Declare a const object listing the alternative text for each image.
- Loop through the array of filenames, and for each one, insert an <img> element inside the thumb-bar <div> that embeds that image in the page along with its alternative text.
- Add a click event listener to each <img> inside the thumb-bar <div> so that, when they are clicked, the corresponding image and alternative text are displayed in the displayed-img <img> element.
- Add a click event listener to the <button> so that when it is clicked, a darken effect is applied to the full-size image. When it is clicked again, the darken effect is removed again.
---
# Main.js Overview / Notes

**Array of image filenames**
```javascript
const images = ['/images/pic1.jpg', '/images/pic2.jpg', '/images/pic3.jpg', '/images/pic4.jpg',
                '/images/pic5.jpg'];
```
**Alternative text for each image file**
```javascript
const imageObject = {
    pic1: 'A picture of an eye',
    pic2: 'A picture of a rock',
    pic3: 'A picture of flowers',
    pic4: 'A picture of an Egyptian painting',
    pic5: 'A picture of a butterfly',
  };
```
**Looping through images**
```javascript
for (let i = 0; i < images.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', images[i]);
    newImage.setAttribute('alt', imageObject[images[i].split('.')[0]]);
    thumbBar.appendChild(newImage);
    newImage.onclick = function(e) {
        displayedImage.src = e.target.src;
    }
}
```
**Image loop explanation**
```easylanguage
// Loop through each value in the 'images' array

for (let i = 0; i < images.length; i++) {

// document.createElement('img'); creates a new image element in memory
// Here we store the dynamically created <img> element in newImage

const newImage = document.createElement('img');

// image[i] retrieves the current image filename from the images array
// .setAttribute('src', images[i]) sets the src attribute of the new
// image element

newImage.setAttribute('src', images[i]);

// Accesses the object storing the alt text for the images
// .split('/').pop() extracts the filename from the current image in images[i]
// 'pic1.jpg'
// .split('.')[0] removes the .jpg extension, leaving just pic1

newImage.setAttribute('alt', imageObject[images[i].split('/').pop().split('.')[0]]);

// Add the new created <img> element to the thumbar <div>

thumbBar.appendChild(newImage);

// Event listener: runs function inside onclick when 'newImage' thumbnail is clicked
// e.target.src gets the src of the clicked thumbnail
// displayedImage.src = e.target.src sets the src of .displayed-img to the same image

newImage.onclick = function(e) {
    displayedImage.src = e.target.src;
}
```

**Darken / lighten overlay button **
```javascript
btn.onclick = function() {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}
```
**Button function explanation**
```easylanguage
// Event listener: runs function inside onclick when 'btn' is clicked
// btn.getAttribute('class'); accesses 'class' for button element

btn.onclick = function() {
    const btnClass = btn.getAttribute('class');

// if (btnClass === 'dark') and button clicked changes class
// attribute to light, and text on button to 'Lighten'
// apply a semi-transparent black overlay

if (btnClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';

// Otherwise, if the class is not 'dark'
// change the class back to 'dark'
// text of button is 'Darken', and remove background overlay by setting fully transparent

else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
}
```


# Disclaimer
The purpose of this write-up/project repository is to create a library of notes to better understand each component of the projects I have created.
