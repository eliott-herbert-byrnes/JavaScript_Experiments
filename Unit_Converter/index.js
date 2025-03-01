function convert() {
    const value = document.getElementById('value').value;
    let result;

    switch (unit) {
        case 'meters':
            result = value * 3.28084 + ' feet';
            break;
        case 'kilometers':
            result = value * 0.621371 + ' miles';
            break;
        case 'miles':
            result = value * 1.60934 + ' kilometers';
            break;
        case 'feet':
            result = value * 0.3048 + ' meters';
            break;
        default:
            result = 'Invalid unit';
    }

    document.getElementById('lengthText').innerText = 'Result: ' + result;
}

const numberInput = document.getElementById('value');  // Reference to input field
const converter = document.getElementById('Converter');
const lengthText = document.getElementById('lengthText');
const volumeText = document.getElementById('volumeText');
const massText = document.getElementById('massText');

let result = 0;

converter.addEventListener("click", () => {
    // convert input to integer
    let numberValue = parseFloat(numberInput.value) || 0;  

    //Length output
    lengthText.innerText = numberValue + " meters = " + (numberValue * 3.281).toFixed(3) + " feet | " 
    + numberValue + " feet = " + (numberValue / 3.281).toFixed(3) + " meters "; 

    //Volume output
    volumeText.innerText = numberValue + " litres = " + (numberValue * 0.264).toFixed(3) + " gallons | " 
    + numberValue + " gallons = " + (numberValue / 0.264).toFixed(3) + " litres "; 

    // Mass output
    massText.innerText = numberValue + " kilos = " + (numberValue * 2.204).toFixed(3) + " pounds | " 
    + numberValue + " pounds = " + (numberValue / 2.204).toFixed(3) + " kilos "; 
});