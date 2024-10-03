const player1 = localStorage.getItem("player-1");
const player2 = localStorage.getItem("player-2");
const ch1 = JSON.parse(localStorage.getItem("selectedCheckboxes"));

const p1 = document.querySelector(".turn");
const playerName1 = document.querySelector(".name1");
const playerName2 = document.querySelector(".name2");
let pieceImg1 = document.querySelector(".piece-img1");
let pieceImg2 = document.querySelector(".piece-img2");
let diceNum1 = document.querySelector(".dice-1");
let start = document.querySelector(".start");
const piece1 = document.querySelector(".piece-1");
const piece2 = document.querySelector(".piece-2");
let btn = document.querySelector(".button");
const gameBoard = document.querySelector(".game-board");
const boxes = document.querySelectorAll(".box");
const exitBtn = document.querySelector(".exit");

playerName1.innerHTML = `${player1}`;
playerName2.innerHTML = `${player2}`;

let images = {
  red: "/Task_Html_CSS/Snake&Ladder/Images/red.png",
  green: "/Task_Html_CSS/Snake&Ladder/Images/green.png",
  blue: "/Task_Html_CSS/Snake&Ladder/Images/blue.png",
  purple: "/Task_Html_CSS/Snake&Ladder/Images/purple.png",
  default: "/Task_Html_CSS/Snake&Ladder/Images/default.png",
};
function setImageForPieces(color1, color2) {
  let piece1Image = images[color1] || images["default"];
  let piece2Image = images[color2] || images["default"];
  pieceImg1.innerHTML = `<img src=${piece1Image} width="25px" height="30px" alt="">`;
  pieceImg2.innerHTML = `<img src=${piece2Image} width="25px" height="30px" alt="">`;

  piece1.innerHTML = `<img src=${piece1Image} width="25px" height="30px" alt="">`;
  piece2.innerHTML = `<img src=${piece2Image} width="25px" height="30px" alt="">`;
}

if (ch1[0] === "red" && ch1[1] === "green") {
  setImageForPieces("red", "green");
} else if (ch1[0] === "green" && ch1[1] === "blue") {
  setImageForPieces("green", "blue");
} else if (ch1[0] === "blue" && ch1[1] === "purple") {
  setImageForPieces("blue", "purple");
} else if (ch1[0] === "red" && ch1[1] === "blue") {
  setImageForPieces("red", "blue");
} else if (ch1[0] === "red" && ch1[1] === "purple") {
  setImageForPieces("red", "purple");
} else if (ch1[0] === "green" && ch1[1] === "purple") {
  setImageForPieces("green", "purple");
} else {
  setImageForPieces("default", "default");
}
let random = Math.floor(Math.random() * 100) + 1;
// console.log(random);
exitBtn.addEventListener("click", () => {
  localStorage.clear();
  location.href = "startPage.html";
});

// let originalArray = [
//   [1, 38],
//   [4, 14],
//   [9, 31],
//   [13, 46],
//   [21, 42],
//   [28, 84],
//   [33, 49],
//   [74, 92],
//   [50, 69],
//   [62, 81],
//   [51, 67],
//   [72, 91],
//   [80, 99],
//   [44, 79],
// ];

// function getRandomUniqueValues(originalArray) {
//   let ladderPosition = [];
//   let tempArray = [...originalArray];

//   while (ladderPosition.length < 9) {
//     let randomIndex = Math.floor(Math.random() * tempArray.length);
//     ladderPosition.push(tempArray[randomIndex]);
//     tempArray.splice(randomIndex, 1);
//   }
//   return ladderPosition;
// }

// let ladderPosition = getRandomUniqueValues(originalArray);

let ladderPosition = [
  [1, 38],
  [4, 14],
  [9, 31],
  [21, 42],
  [28, 84],
  [51, 67],
  [72, 91],
  [80, 99],
  [44, 79],
  // [43, 61],
];
let snakesPosition = [
  [7, 17],
  [19, 62],
  [13, 33],
  [34, 54],
  [36, 87],
  [60, 64],
  [73, 93],
  [75, 94],
  [79, 98],
];

let tog = 1;
let total1 = 0;
let total2 = 0;

btn.addEventListener("click", () => {
  let randomNo1 = Math.floor(Math.random() * 6) + 1;

  function updatePiecePosition(total, piece, currentPlayer, steps) {
    if (steps.length === 0) {
      total = checkLaddersAndSnakes(total, piece);
      if (total == 100) {
        assignPieceToPosition(total, piece);
        alert(currentPlayer + " You Win");
        window.location.reload();
      }
      return;
    } else {
      let nextPosition = steps.shift();
      assignPieceToPosition(nextPosition, piece);
      setTimeout(() => {
        updatePiecePosition(total, piece, currentPlayer, steps);
      }, 500);
    }
  }

  function assignPieceToPosition(position, piece) {
    let a = calcBottom(position) + 15;
    let b = calcLeft(position) + 80;
    piece.style.bottom = a + "px";
    piece.style.left = b + 20 + "px";
  }

  function checkLaddersAndSnakes(total, piece) {
    let originalTotal = total;
    for (let ladder of ladderPosition) {
      if (total === ladder[0]) {
        total = ladder[1];
        assignPieceToPosition(total, piece);
      }
    }
    for (let snake of snakesPosition) {
      if (total === snake[1]) {
        total = snake[0];
        assignPieceToPosition(total, piece);
      }
    }
    return total !== originalTotal ? total : originalTotal;
  }

  function getSteps(start, end) {
    let steps = [];
    for (let i = start + 1; i <= end; i++) {
      steps.push(i);
    }
    return steps;
  }

  function playGame(randomNo1) {
    const currentPlayer = tog % 2 !== 0 ? player1 : player2;
    let total = tog % 2 !== 0 ? total1 : total2;
    const piece = tog % 2 !== 0 ? piece1 : piece2;
    p1.innerHTML = `<p class="p1f">${currentPlayer}'s Turn</p>`;
    diceNum1.setAttribute(
      "src",
      "/Task_Html_CSS/Snake&Ladder/Images/dot" + randomNo1 + ".png"
    );

    let updatedTotal = total + randomNo1;
    total1 = checkLaddersAndSnakes(total1, piece);
    total2 = checkLaddersAndSnakes(total2, piece);
    // Handle player 1 movement
    if (tog % 2 !== 0) {
      if (updatedTotal > 100) {
        updatedTotal = updatedTotal - randomNo1;
        total1 = updatedTotal;
      } else {
        let steps = getSteps(total1, updatedTotal);
        total1 = updatedTotal;
        updatePiecePosition(total1, piece, currentPlayer, steps);
      }
    }
    // Handle player 2 movement
    else {
      if (updatedTotal > 100) {
        updatedTotal = updatedTotal - randomNo1;
        total2 = updatedTotal;
      } else {
        let steps = getSteps(total2, updatedTotal);
        console.log(total2, updatedTotal);
        total2 = updatedTotal;
        updatePiecePosition(total2, piece, currentPlayer, steps);
      }
    }

    tog++;
  }

  playGame(randomNo1);
});

function drawLadders() {
  for (let ladder of ladderPosition) {
    const bottom = calcBottom(ladder[0]);
    const left = calcLeft(ladder[0]);
    const bottom2 = calcBottom(ladder[1]);
    const left2 = calcLeft(ladder[1]);
    const values = calcHypoAndTheta(left, left2, bottom, bottom2);
    const ladderElem = createLadderElem(
      bottom,
      left,
      left2,
      values[0],
      values[1]
    );
    gameBoard.appendChild(ladderElem);
  }
}
function drawSnakes() {
  for (let snake of snakesPosition) {
    const bottom = calcBottom(snake[0]);
    const left = calcLeft(snake[0]);
    const bottom2 = calcBottom(snake[1]);
    const left2 = calcLeft(snake[1]);
    const values = calcHypoAndTheta(left, left2, bottom, bottom2);
    const snakeElem = createSnakeElem(
      bottom,
      left,
      left2,
      values[0],
      values[1]
    );
    gameBoard.appendChild(snakeElem);
  }
}
function calcBottom(num) {
  return (Math.ceil(num / 10) - 1) * 70;
}

function calcLeft(num) {
  num = num.toString().padStart(2, "0");
  const digitOne = num.charAt(0);
  const digitTwo = num.charAt(1);
  if (num < 100) {
    if (digitTwo == 0) {
      if (+digitOne % 2 === 0) {
        return 0;
      }
      return 630;
    } else {
      if (+digitOne % 2 === 0) {
        return (+digitTwo - 1) * 70;
      }
      return (10 - +digitTwo) * 70;
    }
  } else {
    return 0;
  }
}

function calcHypoAndTheta(left, left2, bottom, bottom2) {
  let a = Math.abs(left - left2);
  let b = bottom2 - bottom;
  let imgHeight = Math.floor(Math.hypot(a, b));
  let angleInRadians = Math.atan(a / b);
  let theta = Math.floor(angleInRadians * (180 / Math.PI));
  return [imgHeight, theta];
}

function createLadderElem(bottom, left, left2, height, angle) {
  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "/Task_Html_CSS/Snake&Ladder/Images/Brown-ladder.png"
  );
  img.classList = "ladders-snakes";
  img.style.bottom = bottom + "px";
  img.style.left = left + "px";
  img.style.height = height + "px";
  if (left > left2) {
    img.style.transform = ` translate(17.5px, -35px) rotate(${-angle}deg)`;
    return img;
  } else {
    img.style.transform = ` translate(17.5px, -35px) rotate(${angle}deg)`;
    return img;
  }
}
function createSnakeElem(bottom, left, left2, height, angle) {
  let img = document.createElement("img");
  img.setAttribute("src", "/Task_Html_CSS/Snake&Ladder/Images/new-snake.png");
  img.classList = "ladders-snakes";
  img.style.bottom = bottom + "px";
  img.style.left = left + "px";
  img.style.height = height + "px";
  if (left > left2) {
    img.style.transform = ` translate(17.5px, -35px) rotate(${-angle}deg)`;
    return img;
  } else {
    img.style.transform = ` translate(17.5px, -35px) rotate(${angle}deg)`;
    return img;
  }
}
drawLadders();
drawSnakes();
