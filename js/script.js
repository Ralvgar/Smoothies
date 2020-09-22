import { SmoothieNeuralNet } from './ai.js';

// global const required for page configuration.
const numberOfSmoothies = 20;
const numberOfFruitsInPack = 4;
const numberOfStars = 5;
const fruits = ["🍎", "🍐", "🍋", "🍌", "🍉", "🍇", "🍓", "🥥", "🥒", "🍍"];
let smoothieList = [];
let trainBtnEl;
let resetBtnEl;
let predictBtnEl;
let numericResultEl;
const net = new SmoothieNeuralNet();

document.addEventListener("DOMContentLoaded", () => {
  // Select necessary elements from DOM
  trainBtnEl = document.getElementById('btn-train');
  predictBtnEl = document.getElementById('btn-predict');
  resetBtnEl = document.getElementById('btn-reset');
  numericResultEl = document.getElementById('numeric-result');

  // Attach necessary event listeners
  trainBtnEl.addEventListener('click', onClickOnTrain);
  predictBtnEl.addEventListener('click', onClickOnPredict);
  resetBtnEl.addEventListener('click', onClickOnReset);

  initializeSmoothieList();
  renderSmoothieListToDOM(smoothieList);
  renderStarStatesFromSmoothieList(smoothieList);
});

const onClickOnReset = () => {
  resetSmoothieListValues();
}

const resetSmoothieListValues = () => {
  smoothieList = smoothieList.map((item) => {
    return { ...item, value: 0 }
  });
}

const initializeSmoothieList = () => {
  smoothieList = generateSmoothieList();
}

const renderSmoothieListToDOM = (smoothieList) => {
  smoothieList.forEach((smoothie, idx) => {

    // Creates necessary elements and appends them to the DOM
    const ulEl = document.createElement('ul');
    const smoothieContainerEl = document.createElement('div');
    smoothieContainerEl.appendChild(ulEl)

    // CSS
    smoothieContainerEl.setAttribute("class", "col-6 text-center smoothie-list-item");

    // Generate fruit list elements
    const fruitLiItems = smoothie.fruits.map(fruit => {
      const li = document.createElement('li');
      li.textContent = fruit;
      li.setAttribute("class", "list-inline-item h1 mx-0");
      return li;
    });

    // Generate star list elements
    const starLiItems = generateStarLiItems((value) => onClickOnStar(idx, value));
    [...fruitLiItems, ...starLiItems].forEach((li) => ulEl.appendChild(li));

    // Select element to insert div elements
    const smoothieListContainerEl = document.querySelector('#smoothie-list-container');

    // Append UL to DIV and DIV to DOM
    smoothieContainerEl.appendChild(ulEl)
    smoothieListContainerEl.appendChild(smoothieContainerEl);
  })
};

const onClickOnStar = (smoothieIdx, value) => {
  // Sets selected value to smoothieList (our model)
  smoothieList[smoothieIdx].value = value;
  // Rerender star states after change
  renderStarStatesFromSmoothieList();
};

// Renders corrent star states based on values from smoothieList
const renderResultStarsFromScore = (score) => {
  const indexFromScore = Math.trunc(score / (100 / numberOfStars))
  const resultStars = document.querySelectorAll('.result-stars .star');
  resultStars.forEach(star => star.classList.remove('star--active'));
  resultStars[indexFromScore].classList.add('star--active');
}

const getRandomFruit = () => {
  return fruits[Math.floor(Math.random() * fruits.length)]
}

const getUniqueSmoothie = () => {
  let x = 0;
  const smoothie = [];
  while (x < numberOfFruitsInPack) {
    const fruit = getRandomFruit();
    if (smoothie.length === 0 || !smoothie.includes(fruit)) {
      smoothie[x] = fruit;
      x++
    }
  };
  return smoothie;
}

const generateSmoothieList = () => new Array(numberOfSmoothies).fill(null).map(() => {
  return { fruits: getUniqueSmoothie(), value: 0 }
});

// Generates star li items
const generateStarLiItems = (onClickOnStar) => {
  const liList = [];
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    li.textContent = "⭐️";
    li.setAttribute("style", "cursor: pointer");
    li.addEventListener("click", () => {
      onClickOnStar(i)
    });
    li.setAttribute("class", `h1 list-inline-item ml-3 mr-0 star`)
    liList.push(li);
  }
  return liList;
}

const onClickOnTrain = () => {
  net.train(fruits, smoothieList);
}

const onClickOnPredict = () => {
  const predictionInput = Array.from(document.getElementsByClassName('prediction-input')).map(el => el.value);
  const result = net.predict(fruits, predictionInput);
  const scorePercentage = result.score * 100;

  // Update numeric result element
  numericResultEl.innerText = `${(scorePercentage).toFixed(0)}%`;

  // Update result stars
  renderResultStarsFromScore(scorePercentage);
}