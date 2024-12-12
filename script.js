const papan = document.getElementById("game-board");
const papanSkor = document.getElementById("score");

const BOARD_SIZE = 500;
const CELL_SIZE = 20;

let ular = [{x: 100, y: 100}];
let direction = {x: 0, y: 0 };
let makanan = spawnFood();
let score = 0;

function createDiv(className, x, y){
    const div = document.createElement("div");
    div.className = className;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    papan.appendChild(div);
}

function render(){
    papan.innerHTML = `<div id="score">Score: ${score}</div>`;
    ular.forEach((segment) => createDiv("ular", segment.x, segment.y));
    createDiv("makanan", makanan.x, makanan.y);
}

function gerakanUlar(){
    const newHead = {x: ular[0].x + direction.x, y: ular[0].y + direction.y };
    ular.unshift(newHead);

    if (newHead.x === makanan.x && newHead.y === makanan.y){
        score++;
        makanan = spawnFood();
    }else {
        ular.pop();
    }
}

function spawnFood() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
        y = Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)) * CELL_SIZE;
    } while (ular.some((segment) => segment.x === x && segment.y ===y));
    return { x, y};
}

function checkCollision() {
    const head = ular[0];
    if (
      head.x < 0 || 
      head.y < 0 || 
      head.x >= BOARD_SIZE || 
      head.y >= BOARD_SIZE ||
      ular.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      return true;
    }
    return false;
  }

function gameLoop() {
    if (direction.x !== 0 || direction.y !== 0) {
        gerakanUlar();
        if (checkCollision()) {
        alert("Yahh mati lu brok! udah dapet segini brok :" + score);
        location.reload();
        }
    }
    render();
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -CELL_SIZE };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: CELL_SIZE };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -CELL_SIZE, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: CELL_SIZE, y: 0 };
        break;
    }
  });
  
  setInterval(gameLoop, 150);




