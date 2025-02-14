# JSON_Introduction Overview

- This script dynamically fetches and displays superhero data from a JSON file using JavaScript.
---

# Main.js Overview / Notes

**HTML Structure**
```easylanguage
- The <header> and <section> elements are empty at the start.
- These will later be populated dynamically with JavaScript.
```

**populate() Function (Fetching Data)**
```javascript
async function populate() {
// Fetching JSON data
// requestURL: The URL of the JSON file containing superhero data.
  const requestURL =
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
// Send network request to fetch the JSON file.
  const request = new Request(requestURL);

// Convert response into a JavaScript object.
  const response = await fetch(request);
  const superHeroes = await response.json();

// Calls two functions to update the page. 
  populateHeader(superHeroes);
  populateHeroes(superHeroes);
}
```

**populateHeader(obj) Function (Updating the Header)**
```javascript
function populateHeader(obj) {
// Select HTML header element <header> .
  const header = document.querySelector("header");
// Dynamically creates <h1> element, set's text from JSON.
  const myH1 = document.createElement("h1");
  myH1.textContent = obj.squadName;
// Append elements to <header>, making them visibile on the page.
  header.appendChild(myH1);

// Dynamically creates <p> element. Set's text from JSON.
  const myPara = document.createElement("p");
  myPara.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
  header.appendChild(myPara);
}
```

**populateHeroes(obj) Function (Creating Hero Profiles)**
```javascript
function populateHeroes(obj) {
// Selects <section> where 'hero profiles' from JSON will be inserted.
  const section = document.querySelector("section");
// Assigns 'members' array from JSON to heroes variable.
  const heroes = obj.members;

// Loop through the members array.
  for (const hero of heroes) {
// Dyanamically create elements for array value assignment. 
    const myArticle = document.createElement("article");
    const myH2 = document.createElement("h2");
    const myPara1 = document.createElement("p");
    const myPara2 = document.createElement("p");
    const myPara3 = document.createElement("p");
    const myList = document.createElement("ul");

// Set text content for <elements> from JSON array values.
    myH2.textContent = hero.name;
    myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
    myPara2.textContent = `Age: ${hero.age}`;
    myPara3.textContent = "Superpowers:";

// Assign array from JSON file to 'superPowers' variable.
    const superPowers = hero.powers;
// Loop through array to create <li> items and add them to <ul>.
    for (const power of superPowers) {
      const listItem = document.createElement("li");
      listItem.textContent = power;
      myList.appendChild(listItem);
    }

// Append text elements to article element for visability.
    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

// Append everything to <section> element, making info appear in the UI.
    section.appendChild(myArticle);

// Runs function immediately when the page loads.
// fetches data and updates the page dynamically. 
    populate();
  }
}
```
