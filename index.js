let clickPattern = [];
let patter = [];
let clickAmount = 0;
let t = false; // used to flip after click simulator
let leve = 1;
let a = 0; //used to count start a key , only affect once
let over = false; // check over is ture of false

// clickAnimate And Sound
$(".btn").on("click", function () {
  let buttonColor = this.classList[1];
  playsound(buttonColor);
  $(this).addClass("pressed");
  let storeThis = this;
  setTimeout(function () {
    $(storeThis).removeClass("pressed");
  }, 100);
});

// playSound
function playsound(whichButton) {
  let sound = 0;
  switch (whichButton) {
    case "green":
      sound = new Audio("./sounds/green.mp3");
      sound.play();
      break;
    case "blue":
      sound = new Audio("./sounds/blue.mp3");
      sound.play();
      break;
    case "red":
      sound = new Audio("./sounds/red.mp3");
      sound.play();
      break;
    case "yellow":
      sound = new Audio("./sounds/yellow.mp3");
      sound.play();
      break;
    default:
      break;
  }
}

// clickSimulator
function clickSimulator(historyArray) {
  setTimeout(function () {
    let ss = historyArray[historyArray.length - 1];
    switch (ss) {
      case 0:
        $(".green").trigger("click");

        break;
      case 1:
        $(".red").trigger("click");

        break;
      case 2:
        $(".yellow").trigger("click");

        break;
      case 3:
        $(".blue").trigger("click");

        break;

      default:
        alert("don't work" + ss);
        break;
    }
  }, 100);

  return new Promise((resolve) => setTimeout(resolve, 1000)); //after click simulator is done, then return promise
}
// function clickSimulator(historyArray) {
//   for (let i = 0; i < historyArray.length; i++) {
//     setTimeout(function () {
//       switch (historyArray[i]) {
//         case 0:
//           $(".green").trigger("click");

//           break;
//         case 1:
//           $(".red").trigger("click");

//           break;
//         case 2:
//           $(".yellow").trigger("click");

//           break;
//         case 3:
//           $(".blue").trigger("click");

//           break;

//         default:
//           break;
//       }
//     }, i * 1000);
//   }
//   return new Promise((resolve) =>
//     setTimeout(resolve, historyArray.length * 1000)
//   ); //after click simulator is done, then return promise
// }

function emptyClickPattern() {
  // Your code here
  clickPattern.length = 0;
}

// patterGenerator
function patterGenerator(historyArray) {
  let randomButton = Math.floor(Math.random() * 4);
  historyArray.push(randomButton);
}

// playGame
$(document).keypress(function (event) {
  if ((event.key == "a" || event.key == "A") && a == 0) {
    patter = [];
    generaterAndShow();
    a++;
  }
});
function generaterAndShow() {
  $("h1").text("Leve" + leve);
  leve++;
  patterGenerator(patter);
  asyncClick(patter);
}

// asyncClick use to await in order to empty clickPattern
async function asyncClick(patter) {
  await clickSimulator(patter);

  emptyClickPattern();
  t = true;
  clickAmount = 0;
}

// clickStorePattern
$(".btn").on("click", function () {
  let clickButton = this.classList[1];
  switch (clickButton) {
    case "green":
      clickPattern.push(0);
      break;
    case "red":
      clickPattern.push(1);
      break;
    case "yellow":
      clickPattern.push(2);
      break;
    case "blue":
      clickPattern.push(3);
      break;
    default:
      break;
  }
  console.log(clickPattern);

  //   checkWrong
  if (clickPattern[clickAmount] != patter[clickAmount] && t == true) {
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(() => $("body").removeClass("game-over"), 200);
    t = false;
    over = true;
  }
  clickAmount++;
  //checkWin
  if (clickAmount == patter.length && t == true) {
    console.log("win");
    t = false;
    setTimeout(() => generaterAndShow(), 1500);
  }
});

// over

$(document).keypress(() => {
  if (over) {
    console.log(123);
    // Reload the current page
    location.reload();
  }
});
