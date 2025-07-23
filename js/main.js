const hydrationRadios = document.querySelectorAll('input[name="hydration"]');
const knownsInputs = document.querySelectorAll('input[name="knowns"]');
const desiredHydration = 75;


hydrationRadios.forEach(radio => {
  radio.addEventListener('change', (event) => {
    const selectedHydration = event.target.value;
    getGs();
    
  });
});

knownsInputs.forEach(number => {
  number.addEventListener('change', (event) => {
    const selectedHydration = event.target.value;
    getGs();
    
  });
});

function getGs() {
  const starterValue = parseFloat(document.getElementById('starterInput').value);
  const totalWeight = parseFloat(document.getElementById('weightInput').value);
  const hydrationRadio = document.querySelector('input[name="hydration"]:checked');
  
  // Guard clause: ensure all values are present and valid
  if (isNaN(starterValue) || isNaN(totalWeight) || !hydrationRadio) {
    console.warn('Missing or invalid input(s).');
    return;
  }

  const hydration = parseFloat(hydrationRadio.value);

  calculateSourdough(starterValue, totalWeight, hydration);
}


function calculateSourdough(starter, totalWeight, hydration) {  
  const totalFlour = totalWeight / hydration;
  const totalWater = totalWeight - totalFlour;
  const addedFlour = totalFlour - (starter/2);
  const addedWater = totalWater - (starter/2);

  // Round values
  const roundedFlour = Math.round(addedFlour);
  const roundedWater = Math.round(addedWater);
  const roundedSalt = Math.round(totalFlour * 0.015); //salt = 1.5% total flour

  // Update the DOM
  document.getElementById('flourAmount').textContent = `${roundedFlour}g`;
  document.getElementById('waterAmount').textContent = `${roundedWater}g`;
  document.getElementById('saltAmount').textContent = `${roundedSalt}g`;
}

