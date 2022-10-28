// Form
const parametersForm = document.querySelector('#parameters')
// Form Inputs
const dimensionInput = document.querySelector('#dimension');
const initialInput = document.querySelector('#initial');
const baseInput = document.querySelector('#base');
const calculateBtn = document.querySelector('#calculate');

// Output Tables
const originalFormTables = document.querySelectorAll('.matrix');
const drFormTables = document.querySelectorAll('.drmatrix');

// Properties
const determinants = document.querySelectorAll('.determinant');
const rowSums = document.querySelectorAll('.rowSums');
const colSums = document.querySelectorAll('.colSums');

// DR Properties
const drDeterminants = document.querySelectorAll('.drDeterminant');
const drRowSums = document.querySelectorAll('.drRowSums');
const drColSums = document.querySelectorAll('.drColSums');
const drTraces = document.querySelectorAll('.drTrace');

parametersForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let dimension = parseInt(dimensionInput.value);
    let initial = parseInt(initialInput.value);
    let base = parseInt(baseInput.value);

    if (base === NaN) {
        base = 10;
    }

    try {
        clear();
        loopCalc(dimension, initial, base);

        dimensionInput.classList.toggle('success');
        initialInput.classList.toggle('success');
        baseInput.classList.toggle('success');

        setTimeout(() => {
            dimensionInput.classList.toggle('success');
            initialInput.classList.toggle('success');
            baseInput.classList.toggle('success');

        }, 2000);
    }
    catch (error) {
        console.error(error);

        dimensionInput.classList.toggle('error');
        initialInput.classList.toggle('error');
        baseInput.classList.toggle('error');

        setTimeout(() => {
            dimensionInput.classList.toggle('error');
            initialInput.classList.toggle('error');
            baseInput.classList.toggle('error');
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
        determinants[i].innerText = '';
        drDeterminants[i].innerText = '';

        rowSums[i].innerText = '';
        drRowSums[i].innerText = '';

        colSums[i].innerText = '';
        drColSums[i].innerText = '';

        drTraces[i].innerText = '';
        drTraces[i].classList.remove('successText')
    }
}

//Digital Root Function
function dr(n, base = 10) {
    if (n === 0) {
        return n;
    }
    return 1 + ((n - 1) % (base - 1));
}

// Calculate Matrices Function
function calc(dimension, initial, base) {
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
            drMatrix[i][j] = dr(matrix[i][j], base);
        }
    }

    return { matrix, drMatrix }
}

// Fill Values Function
function loopCalc(dimension, initial, base) {
    let iterator = initial;

    for (let determinant of determinants) {
        determinant.innerText = math.det(calc(dimension, iterator).matrix);
        iterator++;
    }

    iterator = initial;

    for (let determinant of drDeterminants) {
        determinant.innerText = math.det(calc(dimension, iterator).drMatrix);
        iterator++;
    }

    iterator = initial;

    for (let trace of drTraces) {
        trace.innerText = math.trace(calc(dimension, iterator).drMatrix);

        if (dr(math.trace(calc(dimension, iterator, base).drMatrix)) === dr(3 * (iterator + 1)), base) {
            trace.classList.toggle('successText');
        }
    }

    iterator = initial;

    for (let sum = 0; sum < rowSums.length; sum++) {
        const rowSumArray = [];
        const colSumArray = [];

        for (let i = 0; i < dimension; i++) {
            let rowTotal = 0;
            let colTotal = 0;

            for (let j = 0; j < dimension; j++) {
                rowTotal += calc(dimension, iterator, base).matrix[i][j];
                colTotal += calc(dimension, iterator, base).matrix[j][i];
            }

            rowSumArray.push(rowTotal);
            colSumArray.push(colTotal);
        }

        rowSums[sum].innerText = rowSumArray.join(', ');
        colSums[sum].innerText = colSumArray.join(', ');
        iterator++;
    }

    iterator = initial;

    for (let sum = 0; sum < rowSums.length; sum++) {
        const rowSumArray = [];
        const colSumArray = [];

        for (let i = 0; i < dimension; i++) {
            let rowTotal = 0;
            let colTotal = 0;

            for (let j = 0; j < dimension; j++) {
                rowTotal += calc(dimension, iterator, base).drMatrix[i][j];
                colTotal += calc(dimension, iterator, base).drMatrix[j][i];
            }

            rowSumArray.push(rowTotal);
            colSumArray.push(colTotal);
        }

        drRowSums[sum].innerText = rowSumArray.join(', ');
        drColSums[sum].innerText = colSumArray.join(', ');
        iterator++;
    }

    iterator = initial;

    for (let table of originalFormTables) {
        for (let i = 0; i < dimension; i++) {
            let tr = document.createElement('tr')
            table.append(tr)

            for (let j = 0; j < dimension; j++) {
                let td = document.createElement('td')
                td.innerText = calc(dimension, iterator, base).matrix[i][j]
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
                td.innerText = calc(dimension, iterator, base).drMatrix[i][j]
                tr.append(td);
            }
        }
        iterator++;
    }
}