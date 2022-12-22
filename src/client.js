const form = document.querySelector('#conversion-form');
const resultContainer = document.querySelector('#result-container');
const result = document.querySelector('#result');

form.addEventListener('submit', e => {
  e.preventDefault();

  const stringInput = document.querySelector('#string-input');
  const string = stringInput.value;

  fetch('http://localhost:8000/to-binary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ string })
  })
    .then(res => res.text())
    .then(binary => {
      resultContainer.style.display = 'flex';
      result.textContent = binary;
    })
    .catch(err => console.error(err));
});
