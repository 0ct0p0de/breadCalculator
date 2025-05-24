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
  const starterFlour = starter / 2;
  const starterWater = starter / 2;
  const totalHydration = hydration / 100;

  const flour = (totalWeight - starter - 0.02 * starterFlour) / (1 + totalHydration + 0.02);
  const water = totalHydration * totalWeight - starterWater;
  const salt = 0.02 * (flour + starterFlour);

  // Round values
  const roundedFlour = Math.round(flour);
  const roundedWater = Math.round(water);
  const roundedSalt = Math.round(salt * 10) / 10; // salt can stay precise to 0.1g

  // Update the DOM
  document.getElementById('flourAmount').textContent = `${roundedFlour}g`;
  document.getElementById('waterAmount').textContent = `${roundedWater}g`;
  document.getElementById('saltAmount').textContent = `${roundedSalt}g`;
}

