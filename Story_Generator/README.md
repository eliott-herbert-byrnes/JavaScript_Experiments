# Story Generator Overview

- Generates a silly story when the "Generate random story" button is pressed.
- Replaces the default name "Bob" in the story with a custom name, only if a custom name is entered into the "Enter custom name" text field before the generate button is pressed.
- Converts the default US weight and temperature quantities and units in the story into UK equivalents if the UK radio button is checked before the generate button is pressed.
- Generates a new random silly story every time the button is pressed.

---

# Main.js Overview / Notes

**Selectors for HTML objects**
```javascript
const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
```

**Return a random value from an array**
```javascript
function randomValueFromArray(array) {
  // Generate a random index within the valid range of the array
  // Math.random = Generates a random decimal number between 0 (inclusive) and 1 (exclusive).
  // Multiply by array.length = If array.length is '3' this generates a decimal between 0 - 2.9999
  // Math.floor = Rounds down the given decimal number to the nearest whole number
  const random = Math.floor(Math.random() * array.length);
  // Uses 'random' index to retrieve a random element from the array
  return array[random];
}
```

**Story text / Randomized values.**
```javascript
const storyText = `It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:,
they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised —
:insertx: weighs 300 pounds, and it was a hot day.`;

// Arrays of random values
const insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const insertY = ["the soup kitchen", "Disneyland", "the White House"];
const insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk",
                  "turned into a slug and crawled away"];

// Event listener for the randomize button
randomize.addEventListener('click', result);
```

**Function to display the story**
```javascript
function result() {

  // Create a new story from the storyText variable
  let newStory = storyText;

  // Select random values from the arrays and insert them into the newStory variable
  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  // Replace the placeholder text with the random values
  newStory = newStory.replace(/:insertx:/g, xItem);
  newStory = newStory.replace(/:inserty:/g, yItem);
  newStory = newStory.replace(/:insertz:/g, zItem);

  // If the custom name field is not empty, replace the placeholder text with the custom name
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace(/Bob/g, name);

  }

  // If the UK radio button is checked, convert the weight and temperature values
  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + ' stone';
    const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';
    newStory = newStory.replace(/94 fahrenheit/g, temperature);
    newStory = newStory.replace(/300 pounds/g, weight);
  }

  // Display the new story
  story.textContent = newStory;
  story.style.visibility = 'visible';
}
```
# Disclaimer
The purpose of this write-up/project repository is to create a library of notes to better understand each component of the projects I have created.
