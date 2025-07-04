const board = document.getElementById("board");
const statusText = document.getElementById("status");
let tiles = [];

function createBoard() {
  board.innerHTML = "";
  tiles.forEach((num, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.textContent = num === 0 ? "" : num;
    if (num === 0) tile.classList.add("empty");

    tile.addEventListener("click", () => moveTile(i));
    board.appendChild(tile);
  });
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf(0);
  const validMoves = [index - 1, index + 1, index - 3, index + 3];

  if (validMoves.includes(emptyIndex) &&
      !(index % 3 === 0 && emptyIndex === index - 1) &&
      !(index % 3 === 2 && emptyIndex === index + 1)) {
    
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    createBoard();
    checkWin();
  }
}

function shuffle() {
  tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  createBoard();
  statusText.textContent = "";
}

function checkWin() {
  if (tiles.join() === "1,2,3,4,5,6,7,8,0") {
    statusText.textContent = "🎉 You solved it!";
  }
}

window.onload = shuffle;
