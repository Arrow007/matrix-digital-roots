// Form
const parametersForm = document.querySelector('#parameters')
// Form Inputs
const dimensionInput = document.querySelector('#dimension');
const initialInput = document.querySelector('#initial');
const calculateBtn = document.querySelector('#calculate');

// Output Tables
const originalFormTables = document.querySelectorAll('.matrix');
const drFormTables = document.querySelectorAll('.drmatrix');

// Initial Span
const initialSpan = document.querySelectorAll('.initial');
// Properties
const determinants = document.querySelectorAll('.determinant');
const rowSums = document.querySelectorAll('.rowSums');
const colSums = document.querySelectorAll('.colSums');

// DR Initial Span
const drInitialSpan = document.querySelectorAll('.drInitial');
// DR Properties
const drDeterminants = document.querySelectorAll('.drDeterminant');
const drRowSums = document.querySelectorAll('.drRowSums');
const drColSums = document.querySelectorAll('.drColSums');

parametersForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let dimension = parseInt(dimensionInput.value);
    let initial = parseInt(initialInput.value);

    try {
        clear();
        loopCalc(dimension, initial);

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
    for (let i = 0; i < determinants.length; i++) {
        initialSpan[i].innerText = '';
        drInitialSpan[i].innerText = '';

        determinants[i].innerText = '';
        drDeterminants[i].innerText = '';

        rowSums[i].innerText = '';
        drRowSums[i].innerText = '';

        colSums[i].innerText = '';
        drColSums[i].innerText = '';
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
    const matrix = Array.from(Array(dimension), () => new Array(dimension));
    let iterator = initial;

    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            matrix[i][j] = iterator;
            iterator++;
        }
    }

    const drMatrix = Array.from(Array(dimension), () => new Array(dimension));
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            drMatrix[i][j] = dr(matrix[i][j]);
        }
    }

    return { matrix, drMatrix }
}

// Fill Values Function
function loopCalc(dimension, initial) {
    let iterator = initial;

    for (let determinant of determinants) {
        determinant.innerText = math.det(calc(dimension, iterator).matrix);
    }

    for (let determinant of drDeterminants) {
        determinant.innerText = math.det(calc(dimension, iterator).drMatrix);
    }

    for (let sum = 0; sum < rowSums.length; sum++) {
        const rowSumP = document.createElement('p');
        const colSumP = document.createElement('p');

        for (let i = 0; i < dimension; i++) {
            let rowTotal = 0;
            let colTotal = 0;

            for (let j = 0; j < dimension; j++) {
                rowTotal += calc(dimension, iterator).matrix[i][j];
                colTotal += calc(dimension, iterator).matrix[j][i];
            }

            rowSumP.innerText += `${rowTotal}, `;
            colSumP.innerText += `${colTotal}, `;
        }

        rowSums[sum].append(rowSumP);
        colSums[sum].append(colSumP);
    }

    for (let sum = 0; sum < rowSums.length; sum++) {
        const drRowSumP = document.createElement('p');
        const drColSumP = document.createElement('p');

        for (let i = 0; i < dimension; i++) {
            let rowTotal = 0;
            let colTotal = 0;

            for (let j = 0; j < dimension; j++) {
                rowTotal += calc(dimension, iterator).matrix[i][j];
                colTotal += calc(dimension, iterator).matrix[j][i];
            }

            drRowSumP.innerText += `${rowTotal}, `;
            drColSumP.innerText += `${colTotal}, `;
        }

        drRowSums[sum].append(drRowSumP);
        drColSums[sum].append(drColSumP);
    }

    for (let table of originalFormTables) {
        for (let i = 0; i < dimension; i++) {
            let tr = document.createElement('tr')
            table.append(tr)

            for (let j = 0; j < dimension; j++) {
                let td = document.createElement('td')
                td.innerText = calc(dimension, iterator).matrix[i][j]
                tr.append(td);
            }
        }
        iterator++;
    }

    iterator = initial;

    for (let table of drFormTables) {
        for (let i = 0; i < dimension; i++) {
            let tr = document.createElement('tr')
            table.append(tr)

            for (let j = 0; j < dimension; j++) {
                let td = document.createElement('td')
                td.innerText = calc(dimension, iterator).drMatrix[i][j]
                tr.append(td);
            }
        }
        iterator++;
    }
}