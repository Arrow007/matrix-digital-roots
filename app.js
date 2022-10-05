// Form
const parametersForm = document.querySelector('#parameters')
// Form Inputs
const dimensionInput = document.querySelector('#dimension');
const initialInput = document.querySelector('#initial');
const calculateBtn = document.querySelector('#calculate');

// Output Tables
const originalFormTables = document.querySelectorAll('.matrix');
const drFormTables = document.querySelectorAll('.drmatrix');

parametersForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let dimension = parseInt(dimensionInput.value);
    let initial = parseInt(initialInput.value);

    try {
        clear();
        calc(dimension, initial);

        dimensionInput.classList.toggle('success');
        initialInput.classList.toggle('success');

        setTimeout(() => {
            dimensionInput.classList.toggle('success');
            initialInput.classList.toggle('success');
        }, 2000);
    }
    catch (error) {
        console.error(error);

        dimensionInput.classList.toggle('error');
        initialInput.classList.toggle('error');

        setTimeout(() => {
            dimensionInput.classList.toggle('error');
            initialInput.classList.toggle('error');
        }, 2000);
    }
})

// Clear Tables Function
function clear() {
    for (let originalFormTable of originalFormTables) {
        originalFormTable.innerHTML = '';
    }
    for (let drFormTable of drFormTables) {
        drFormTable.innerHTML = '';
    }
}

//Digital Root Function
function dr(n, base = 10) {
    if (n === 0) {
        return n;
    }
    return 1 + ((n - 1) % (base - 1));
}

// Uhh pretty much everything function
function calc(dimension, initial) {
    let matrix = Array.from(Array(dimension), () => new Array(dimension));
    let iterator = initial;

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            matrix[i][j] = iterator;
            iterator++;
        }
    }

    let drMatrix = Array.from(Array(dimension), () => new Array(dimension));
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            drMatrix[i][j] = dr(matrix[i][j]);
        }
    }

    for (let originalFormTable of originalFormTables) {
        for (let i = 0; i < dimension; i++) {
            let tr = document.createElement('tr')
            originalFormTable.append(tr)
            for (let j = 0; j < dimension; j++) {
                let td = document.createElement('td')
                td.innerText = matrix[i][j]
                tr.append(td);
            }
        }
    }

    for (let drFormTable of drFormTables) {
        for (let i = 0; i < dimension; i++) {
            let tr = document.createElement('tr')
            drFormTable.append(tr)
            for (let j = 0; j < dimension; j++) {
                let td = document.createElement('td')
                td.innerText = drMatrix[i][j]
                tr.append(td);
            }
        }
    }
}