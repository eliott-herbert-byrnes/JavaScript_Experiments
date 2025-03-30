# Artlify
Artlify is a simple and elegant JavaScript web app that simulates an online art print store. Visitors can browse a curated selection of items, add up to three to their basket, and complete a mock checkout experience via a dynamic form.

![Artlify Preview](/images/readme-preview.png)

## Key Features
- Interactive Shopping Cart
Users can add and remove items with intuitive controls. The cart is limited to 3 unique items to simulate a “limited edition” experience.

- Live Total Calculation
The total price of items in the basket is calculated in real-time as users interact with the cart.

- Order Completion Flow
A mock payment form is presented on checkout, requiring name, email, card number, and CVV. Once submitted, a custom thank-you message is displayed.

- Single Page UI
The entire app is rendered dynamically with JavaScript. No page reloads or navigation required.

- Basic Input Validation
The form includes required fields and some basic patterns (like email validation).

## Tech Stack

- Vanilla JavaScript (ES6)
- HTML & CSS
- Modular JS structure using import / export
- Asset-driven design (each item image is sourced via its unique id)

## Project Structure
```kotlin
├── index.html
├── index.js         // Main app logic
├── data.js          // Menu item data
├── images/          // Product images (named by ID)
├── styles.css       // App styling
└── README.md
```
## How to Run
```bash
git clone https://github.com/your-username/artlify.git
```
## Limitations
- No persistent state — cart resets on page refresh.
- Checkout form is not connected to a real payment processor.
- Input validation is minimal and for demonstration purposes only.
## To-Do / Potential Improvements
- Add localStorage to persist the cart between sessions
- Improve input validation with real-time feedback
- Make the UI fully responsive
- Add quantity support and filtering
- Animate transitions (e.g. when adding/removing items
