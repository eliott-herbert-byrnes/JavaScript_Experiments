import './style.css'

window.onload = () => {
    // Defaults first item in dropdown
    const dropdownButton = document.getElementById('colorDropdownButton');
    
    const item1 = document.getElementById('monochrome');
    const item2 = document.getElementById('monochrome-dark');
    const item3 = document.getElementById('monochrome-light');
    const item4 = document.getElementById('analogic');
    const item5 = document.getElementById('complement');
    const item6 = document.getElementById('analogic-complement');
    const item7 = document.getElementById('triad');

    let mode = document.querySelector('.colorDropdownContent .colorDropdownItem');

    if (mode && dropdownButton) {
        dropdownButton.textContent = mode.textContent;
      } 
      
      if (dropdownButton) {
        item1.addEventListener('click', function () {
            mode.id = item1.id;
            dropdownButton.textContent = item1.textContent;

        })
        item2.addEventListener('click', function () {
            mode.id = item2.id;
            dropdownButton.textContent = item2.textContent;

        })
        item3.addEventListener('click', function () {
            mode.id = item3.id;
            dropdownButton.textContent = item3.textContent;

        })
        item4.addEventListener('click', function () {
            mode.id = item4.id;
            dropdownButton.textContent = item4.textContent;

        })
        item5.addEventListener('click', function () {
            mode.id = item5.id;
            dropdownButton.textContent = item5.textContent;

        })
        item6.addEventListener('click', function () {
            mode.id = item6.id;
            dropdownButton.textContent = item6.textContent;

        })
        item7.addEventListener('click', function () {
            mode.id = item7.id;
            dropdownButton.textContent = item7.textContent;
        })
      }

    // Get's colour scheme from API requests and renders to DOM
    const colorButton = document.getElementById('colorButton')

    if (colorButton) {
        colorButton.addEventListener('click', function () {
            
            // Get values from color picker
            const colorPicker = document.getElementById('html5colorpicker');
            const colorValue = colorPicker.value;
            const colorValueHex = colorValue.substring(1);

            fetch(`https://www.thecolorapi.com/scheme?hex=${colorValueHex}&format=json&mode=${mode.id}&count=6`)
                .then(response => response.json())
                .then(data => {

                    const colors = data.colors;
                    colors.forEach((color, index) => {
                        // console.log(index, color.hex.value)
                        if (index === 1){
                            document.getElementById('color1').style.backgroundColor = color.hex.value;
                            document.getElementById('colorText1').textContent = color.hex.value;
                        }
                        if (index === 2){
                            document.getElementById('color2').style.backgroundColor = color.hex.value;
                            document.getElementById('colorText2').textContent = color.hex.value;
                        }
                        if (index === 3){
                            document.getElementById('color3').style.backgroundColor = color.hex.value;
                            document.getElementById('colorText3').textContent = color.hex.value;
                        }
                        if (index === 4){
                            document.getElementById('color4').style.backgroundColor = color.hex.value;
                            document.getElementById('colorText4').textContent = color.hex.value;
                        }
                        if (index === 5){
                            document.getElementById('color5').style.backgroundColor = color.hex.value;
                            document.getElementById('colorText5').textContent = color.hex.value;
                        }

                    })
                })
        })
    }

}
