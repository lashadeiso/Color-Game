const chooseBtn = document.querySelector(".choose-btn");
const section3 = document.querySelector(".section-3");
const startBtn = document.querySelector(".start-btn");
const result = document.querySelector(".result");
const luckyColorAre = document.querySelector(".lucky-color");
const chanceArea = document.querySelector(".section-3");
let chance = 1;

function gridItems() {
  let gridItemNumber = +section3.className.split("-")[2];
  while (gridItemNumber > 0) {
    const listItem = document.createElement("li");
    listItem.className = "box";
    section3.appendChild(listItem);
    gridItemNumber--;
  }
}
gridItems();

chooseBtn.addEventListener("click", () => {
  chanceArea.dataset.content = `Chance 1`;
  result.textContent = "";
  result.style.backgroundColor = "rgb(208, 204, 204)";
  luckyColorAre.textContent = "";
  chooseBtn.classList.toggle("hard");
  section3.classList.toggle("grid-12");
  section3.classList.toggle("grid-6");
  chooseBtn.classList.contains("hard")
    ? (chooseBtn.textContent = "Hard")
    : (chooseBtn.textContent = "Easy");
  section3.innerHTML = "";
  gridItems();
  setColorsToBoxes(getRandomColorsList());
  itemFinal();
});

function generateRandomNumber(start, end) {
  return ~~(Math.random() * (end - start) + start);
}

function generateRandomColor() {
  return `rgb(${generateRandomNumber(0, 255)},${generateRandomNumber(
    0,
    255
  )},${generateRandomNumber(0, 255)})`;
}

function getRandomColorsList() {
  return [...Array(+section3.className.split("-")[2])].map(() =>
    generateRandomColor()
  );
}

function setColorsToBoxes(colorsList) {
  document.querySelectorAll(".box").forEach((item) => {
    item.style.backgroundColor = colorsList.pop();
  });
}

setColorsToBoxes(getRandomColorsList());

function getLuckyColor(colorsList) {
  return colorsList[generateRandomNumber(0, colorsList.length - 1)];
}

function getCurrentColorList() {
  let arr = [];
  document
    .querySelectorAll(".box")
    .forEach((item) => arr.push(item.style.backgroundColor));
  return arr;
}

startBtn.addEventListener("click", function () {
  chance = 1;
  result.textContent = "Result";
  result.style.backgroundColor = "rgb(153, 61, 130)";
  colorsCollection = getCurrentColorList();
  luckyColor = getLuckyColor(colorsCollection);
  luckyColorAre.textContent = luckyColor;
  chanceArea.dataset.content = `Chance ${chance}`;
  console.log(colorsCollection);
});

function itemFinal() {
  document.querySelectorAll(".box").forEach((item) => {
    item.addEventListener("click", () => {
      let itemColor = item.style.backgroundColor;
      if (chance >= 0 && itemColor === luckyColorAre.textContent) {
        result.textContent = "Succes";
        result.style.backgroundColor = "rgb(225, 74, 87)";
        chance === 1 && alert("Congratulations, you are the winner");
      } else {
        chance--;
        chanceArea.dataset.content = `Chance 0`;
      }
      if (
        chance < 0 &&
        itemColor != luckyColorAre.textContent &&
        result.textContent != "Succes" &&
        result.textContent != ""
      ) {
        result.textContent = "Game Over";
        result.style.backgroundColor = "red";
        chanceArea.dataset.content = `Chance 0`;
      }
    });
  });
}
itemFinal();
