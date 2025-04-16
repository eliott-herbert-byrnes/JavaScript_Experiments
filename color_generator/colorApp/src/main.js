import './style.css'

window.onload = () => {
  const dropdownButton = document.getElementById('colorDropdownButton');
  const colorButton = document.getElementById('colorButton');
  const colorPicker = document.getElementById('html5colorpicker');
  const dropdownItems = document.querySelectorAll('.colorDropdownItem');

  let mode = document.querySelector('.colorDropdownContent .colorDropdownItem');

  // Set default mode and button label
  if (mode && dropdownButton) {
    dropdownButton.textContent = mode.textContent;
  }

  // Attach click event listeners to all dropdown items
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      mode = item;
      dropdownButton.textContent = item.textContent;
    });
  });

  // Fetch and display color scheme
  if (colorButton) {
    colorButton.addEventListener('click', () => {
      const colorValueHex = colorPicker.value.substring(1);

      fetch(`https://www.thecolorapi.com/scheme?hex=${colorValueHex}&format=json&mode=${mode.id}&count=6`)
        .then(response => response.json())
        .then(data => {
          const colors = data.colors;

          // Loop from index 1 to 5
          for (let i = 1; i <= 5; i++) {
            const colorBox = document.getElementById(`color${i}`);
            const colorText = document.getElementById(`colorText${i}`);

            if (colors[i]) {
              colorBox.style.backgroundColor = colors[i].hex.value;
              colorText.textContent = colors[i].hex.value;
            }
          }
        });
    });
  }
}
