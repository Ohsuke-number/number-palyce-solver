const size = 30;

const solve = () => {
  const traverse = (index) => {
    if (index === 81) {
      return true;
    }
    const x = index % 9;
    const y = Math.trunc(index / 9);
    const cell = board[y][x];
    if (!cell.number) {
      for (let n = 1; n <= 9; n++) {
        cell.number = n;
        if (check(x, y)) {
          if (traverse(index + 1)) {
            return true;
          }
        }
        cell.number = 0;
      }
    } else {
      if (check(x, y)) {
        if (traverse(index + 1)) {
          return true;
        }
      }
    }
    return false;
  };
  const check = (x, y) => {
    const bin = [];
    for (let i = 0; i < 9; i++) {
      const number = board[i][x].number;
      if (number) {
        if (bin[number]) {
          return false;
        }
        bin[number] = true;
      }
    }
    bin.length = 0;
    for (let i = 0; i < 9; i++) {
      const number = board[y][i].number;
      if (number) {
        if (bin[number]) {
          return false;
        }
        bin[number] = true;
      }
    }
    bin.length = 0;
    for (let i = 0; i < 9; i++) {
      const left = Math.trunc(x / 3) * 3;
      const top = Math.trunc(y / 3) * 3;
      const tx = left + (i % 3);
      const ty = top + Math.trunc(i / 3);
      const number = board[ty][tx].number;
      if (number) {
        if (bin[number]) {
          return false;
        }
        bin[number] = true;
      }
    }
    return true;
  };

  if (!traverse(0)) {
    alert("Failure!");
  } else {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const cell = board[y][x];
        cell.div.textContent = cell.number;
        if (!cell.userInput) {
          cell.div.style.color = "#00f";
        }
      }
    }
  }
};

const board = [];
let focus = null;
const init = () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  container.style.position = "relative";
  container.style.width = `${size * 9}px`;
  container.style.height = `${size * 10.8}px`;

  for (let y = 0; y < 9; y++) {
    board[y] = [];
    for (let x = 0; x < 9; x++) {
      const div = document.createElement("div");
      container.appendChild(div);
      div.style.position = "absolute";
      div.style.width = `${size}px`;
      div.style.height = `${size}px`;
      div.style.left = `${size * x}px`;
      div.style.top = `${size * y}px`;
      div.style.fontSize = `${size * 0.8}px`;
      div.style.border = `1px solid #000`;
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "center";
      div.textContent = "";

      board[y][x] = { div, number: 0, userInput: false };

      div.onpointerdown = (e) => {
        e.preventDefault();
        if (focus) {
          const [px, py] = focus;
          board[py][px].div.style.backgroundColor = "";
        }
        focus = [x, y];
        board[y][x].div.style.backgroundColor = "#ff0";
      };
    }
  }

  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.style.position = "absolute";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.left = `${size * i}px`;
    div.style.top = `${size * 9.5}px`;
    div.style.fontSize = `${size * 0.8}px`;
    div.style.border = `1px solid #000`;
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.textContent = i === 9 ? "" : i + 1;

    div.onpointerdown = (e) => {
      e.preventDefault();

      if (focus) {
        const [x, y] = focus;
        board[y][x].div.textContent = i === 9 ? "" : i + 1;
        board[y][x].number = i === 9 ? 0 : i + 1;
        board[y][x].userInput = i === 9 ? false : true;
      }
    };
  }

  const button = document.createElement("input");
  button.type = "button";
  button.value = "Solve!";
  button.onclick = () => {
    solve();
  };
  document.body.appendChild(button);
};

window.onload = () => {
  init();
};
