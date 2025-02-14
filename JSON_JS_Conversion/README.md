# JSON_JS_Conversion

- Fetch JSON data from an external file.
- Parse the JSON into JavaScript objects.
- Function experiments with parsed JSON -> JS objects.
---

# Main.js Overview / Notes

**HTML Structure**
```easylanguage
- The <header> and <section> elements are empty at the start.
- These will later be populated dynamically with JavaScript.
```

**Selecting and Creating DOM Elements**
```javascript
// Select HTML header element <header>
  const section = document.querySelector('section');

// Create two new HTML <p> elements
  let para1 = document.createElement('p');
  let para2 = document.createElement('p');

// Create two new variables to store the cat info  
  let motherInfo = 'The mother cats are called ';
  let kittenInfo = '';
```

**Fetching the JSON File**
```javascript
// URL of JSON file stored in requestURL
  const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';

// Sends a request to receive the JSON file
  fetch(requestURL)
// Converts the response into plain text (JSON format)
  .then(response => response.text())
// Calls displayCatInfo() with the JSON text as an argument
  .then(text => displayCatInfo(text))
```

**Processing the JSON Data**
```javascript
  function displayCatInfo(catString) {
//Total kitten count + male kittens
  let total = 0;
  let male = 0;

// Converts JSON string into a JavaScript array
  const cats = JSON.parse(catString);

// Create an empty array to store the mother cat names
  let motherNames = [];

// Loops through each mother cat object in cats
// If a cat has a name, it is added to the motherNames array
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].name !== '') {
      motherNames.push(cats[i].name);
    }

// Loops through each kitten inside the current mother cat’s kittens array
// Increment the total kitten count/ male count
  for (let j = 0; j < cats[i].kittens.length; j++) {
    total++;
    if (cats[i].kittens[j].gender === 'm') {
      male++;
    }
  }
```

**Formatting the Mother Cat Names**
```javascript
// Formatting the mother cat names
// If there is only 1 value in array, display only the name
  if (motherNames.length === 1) {
    motherInfo += `${motherNames[0]}.`;
    // If there are 2 values in array, display both names with 'and' in between
  } else if (motherNames.length === 2) {
    motherInfo += `${motherNames[0]} and ${motherNames[1]}.`;
    // If there are more than 2 values in array, display all names with commas and 'and' before the last name
  } else {
    let lastMother = motherNames.pop();
    motherInfo += motherNames.join(', ') + ', and ' + lastMother + '.';
  }

// Details on kittens to be added to the kittenInfo variable
  kittenInfo = `There are ${total} kittens in total, ${male} male kittens and 
  ${total - male} female kittens.`;

// Set the text content of the <p> elements to the mother and kitten info
  para1.textContent = motherInfo;
  para2.textContent = kittenInfo;
```
