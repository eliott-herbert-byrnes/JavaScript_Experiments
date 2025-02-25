const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?",
    "/"];

// Initialise Buttons
let symbols = true;
let numbers = true;
let passwordLength = 8;

// Get Button ID Elements
let passwordText = document.getElementById('password-generation-text');
let passwordLengthValue = document.getElementById('password-length-text');

// Set Password Length text
passwordLengthValue.textContent = passwordLength;

// Determines the length of the password
function passwordLengthClick() {
    if (passwordLength === 8) {
        passwordLength = 12;
        passwordLengthValue.textContent = passwordLength;
    } else if (passwordLength === 12) {
        passwordLength = 16;
        passwordLengthValue.textContent = passwordLength;
    } else {
        passwordLength = 8;
    }
    passwordLengthValue.textContent = passwordLength;
}

// Activate symbols in password
function symbolsClick() {
    let currentColor = window.getComputedStyle(includeSymbols).backgroundColor; // Get computed color

    if (currentColor === 'rgb(74, 223, 134)') { // Check for green
        includeSymbols.style.backgroundColor = '#2A2D2F'; // Change to dark
        symbolsText.style.color = 'rgb(74, 223, 134)'
        symbols = false;
    } else {
        includeSymbols.style.backgroundColor = '#4ADF86'; // Change to green
        symbolsText.style.color = '#2A2D2F';
        symbols = true;
    }
}

// Activate numbers in password
function numbersClick() {
    let currentColor = window.getComputedStyle(includeNumbers).backgroundColor;

    if (currentColor === 'rgb(74, 223, 134)') { // Check for green
        includeNumbers.style.backgroundColor = '#2A2D2F'; // Change to dark
        numbersText.style.color = 'rgb(74, 223, 134)'
        numbers = false;
    } else {
        includeNumbers.style.backgroundColor = '#4ADF86'; // Change to green
        numbersText.style.color = '#2A2D2F';
        numbers = true;
    }
}

// Generate Password Function
function passwordGeneration() {
    let password = "";

    let allowedCharacters = [];

    // Include symbols
    if (symbols) {
        allowedCharacters = allowedCharacters.concat(["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]);
    }

    // include numbers
    if (numbers) {
        allowedCharacters = allowedCharacters.concat(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    }

    // Always include letters
    allowedCharacters = allowedCharacters.concat(
        ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    );

    // Generate the password using the filtered character set
    for (let i = 0; i < passwordLength; i++) {
        let randomCharacterIndex = Math.floor(Math.random() * allowedCharacters.length);
        password += allowedCharacters[randomCharacterIndex];
    }

    passwordText.textContent = password;
}

// Copy password text alert
function passwordCopy() {
    let copyText = document.getElementById("password-generation-text").textContent;

    // Use the Clipboard API
    navigator.clipboard.writeText(copyText).then(() => {
        alert("Password copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

