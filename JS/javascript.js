
// global const required for page configuration.
const numberOfSmoothies = 10;
const numberOfFruitsInPack = 4;
const fruits = ["🍎", "🍐", "🍋", "🍌", "🍉", "🍇", "🍓", "🥥", "🥒", "🍍"];


const onClickOnStar = (value, idx) => {
  smoothieList[idx].value = value;
  renderListToDOM(smoothieList, onClickOnStar)
};

document.addEventListener("DOMContentLoaded", () => {
  renderListToDOM(smoothieList, onClickOnStar);
});

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

function generateSmoothieList() { new Array(numberOfSmoothies).fill(null).map(() => {
  return { fruits: getUniqueSmoothie(), value: 0 }
})};

// Put each item into the DOM
const renderListToDOM = (smoothieList, onClickOnStar) => {

  smoothieList.forEach((smoothie, idx) => {
    const smoothieContainerEl = document.createElement('div');
    smoothieContainerEl.setAttribute("class", "col-12 text-center");
    const listEl = document.createElement('ul');

    // Create a list item for each select and append it to the list.
    const liList = [];
    smoothie.fruits.forEach(fruit => {
      const li = document.createElement('li');
      li.textContent = fruit;
      li.setAttribute("class", "list-inline-item h1 mx-0");
      liList.push(li);
    });

    const starLiItems = getStars(smoothie.value, (value) => onClickOnStar(value, idx));
    liList.push(...starLiItems);
    liList.forEach((li) => listEl.appendChild(li));
    const smoothieListContainerEl = document.querySelector('#smoothie-list-container');
    smoothieListContainerEl.appendChild(smoothieContainerEl);
    smoothieContainerEl.appendChild(listEl)
  })

 
};

// Create a list item for each star and append it to the list.
const getStars = (value, onClickOnStar) => {
  const liList = [];
  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    li.textContent = "⭐️";
    li.setAttribute("style", "cursor: pointer");
    li.addEventListener("click", () => onClickOnStar(i));
    li.setAttribute("class", `h1 list-inline-item ml-3 mr-0 star`)
    if (i > value) {
      li.classList.add('star--unchecked');
    }
    liList.push(li);
  }
  return liList;
}




// See if the stars are checked

const isChecked = (element) => {
  const items = element.parentElement;
  const classList = element.className.split(" ");
  const value = element.getAttribute("data-value");
  const number = items.getAttribute("number");
  let counter = 1;
  items.childNodes.forEach(item => {
    const itemList = item.className.split(" ");
    if (itemList.includes("star")) {
      if (counter <= value) {
        counter++;
        itemList.pop();
        itemList.push("star--checked");
        item.className = itemList.join(" ");
      } else {
        counter++;
        itemList.pop();
        itemList.push("star--unchecked");
        item.className = itemList.join(" ");
      }
    };
  })
  getValue(value, number);
};


// Modifies the listValues with the information taken from the DOM;
const getValue = (value, number) => {
  listValues[number] = parseInt(value);
  console.log(listValues);
};


// Makes an object with the values from FruitPacks as key and Stars puntuation as value

const objectValue = () => {
  const objPackValues = {};
  selection.forEach((key, value) => objPackValues[key] = listValues[value]);
  console.log(objPackValues);
  return objectValue;
};

// Reset the listValues.

const resetStars = () => {
  const stars = document.getElementsByClassName('star--checked');
  console.log(stars);
  for (let i = 0; i < stars.length; i++) {
    const starValue = parseInt(stars[i].getAttribute("data-value"));
    if (starValue !== 1) {
      const starClass = stars[i].className.split(" ");
      starClass[starClass.indexOf("star--checked")] = "star--unchecked";
      console.log(starValue);
      //stars[i].className = starClass.join(" ");
    }
  }
};

const reset = () => {
  listValues = [];
  createListValues();
  resetStars();
}


const smoothieList = generateSmoothieList();