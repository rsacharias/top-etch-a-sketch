function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}

function darkenColor(color, factor = 0.1) {
  const rgbValues = color.match(/\d+/g);

  const [r, g, b] = rgbValues.map((val) => Math.max(val - 256 * factor, 0));

  return `rgb(${r}, ${g}, ${b})`;
}

function createGrid(size) {
  const grid = document.querySelector("#grid");
  grid.textContent = "";

  const gridSize = parseInt(getComputedStyle(grid).width.trimEnd("px"));
  const squareSize = gridSize / size;

  for (let i = 0; i < size * size; ++i) {
    const square = document.createElement("div");

    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";

    square.addEventListener("mouseenter", () => {
      square.style.backgroundColor = darkenColor(
        square.style.backgroundColor || getRandomColor(),
      );
    });

    grid.appendChild(square);
  }
}

function promptGrid() {
  const input = prompt("Enter size of grid (1 <= size <= 100):");
  const size = +input;

  if (!input) return;

  if (isNaN(size) || size < 0 || size > 100) {
    alert("Size must be a valide integer >= 1 and <= 100!");
    return;
  }

  createGrid(size);
}

const newSketch = document.querySelector("#new");
newSketch.addEventListener("click", promptGrid);
