function global(){

var userInput = document.getElementById("userInput").value;


// const n = 12357;
const generatedNumbers = genNums(userInput);

const pnc = new Set(generatedNumbers);

const primeNumbers = Array.from(pnc).filter(isPrime);

const max = Math.max(...primeNumbers);

  drawPascalsTriangle(max);


console.log("Prime numbers:", primeNumbers);
console.log("max:", max);

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function genNums(num) {
  const arr = Array.from(String(num), Number);
  const res = [];

  function gen(cur, rem) {
    const genNum = parseInt(cur.join(""), 10);

    if (!isNaN(genNum)) res.push(genNum);

    for (let i = 0; i < rem.length; i++) {
      const updCur = [...cur, rem[i]];
      const updRem = [...rem.slice(0, i), ...rem.slice(i + 1)];
      gen(updCur, updRem);
    }
  }

  gen([], arr);
  return res;
}



function generatePascalsTriangle(rows) {
  let breaker = false;
  const triangle = [];
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
        if (triangle[i][j] > max) {
          breaker = true;
        }
      }
    }
    if (breaker) {
      break;
    }
  }
  return triangle;
}

window.onload = function () {
};

function drawPascalsTriangle(rows) {
  const canvas = document.getElementById("pascalsCanvas");
  const ctx = canvas.getContext("2d");
  const triangle = generatePascalsTriangle(rows);

  const circleRadius = 12;
  const horizontalSpacing = 2.5;
  const verticalSpacing = 20;

  const triangleHeight = triangle.length * (circleRadius * 2 + verticalSpacing);
  const triangleWidth =
    triangle[triangle.length - 1].length *
    (circleRadius * 2 + horizontalSpacing);

  canvas.width = triangleWidth;
  canvas.height = triangleHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "10px Arial";

  console.log(triangle.length);

  for (let i = 0; i < triangle.length; i++) {
    const startX =
      (canvas.width - i * (circleRadius * 2 + horizontalSpacing)) / 2;
    const startY = (i + 1) * (circleRadius * 2 + verticalSpacing);

    for (let j = 0; j < triangle[i].length; j++) {
      const number = triangle[i][j];
      const textWidth = ctx.measureText(number).width;
      ctx.beginPath();
      ctx.arc(
        startX + j * (circleRadius * 2 + horizontalSpacing) + circleRadius,
        startY,
        circleRadius,
        0,
        2 * Math.PI
      );

      // console.log(primeNumbers.toString());
      console.log(number);

      ctx.fillStyle = primeNumbers.includes(number) ? "blue" : "pink";
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.fillText(
        number,
        startX +
          j * (circleRadius * 2 + horizontalSpacing) +
          circleRadius -
          textWidth / 2,
        startY + 6
      );
    }
  }
}


  
// console.log(`Pascal's Triangle Row ${k}:`, pascalsTriangleRow);

}