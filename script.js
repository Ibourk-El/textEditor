let icons = document.querySelectorAll("i");
let text_box = document.getElementById("text-box");
let fontSize = document.getElementById("font-size");
let addTableBtn = document.getElementById("add");
let alignText = document.querySelectorAll(".align");

let textStack = [];
let txtStackIndex = -1;

icons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    if (textStack.length > 0) {
      resetAlignText(e.target);
      if (e.target.classList.contains("active")) {
        textStack[txtStackIndex].classList.add(
          e.target.getAttribute("data-style")
        );
      } else {
        textStack[txtStackIndex].classList.remove(
          e.target.getAttribute("data-style")
        );
      }
    }
  });
});

fontSize.addEventListener("change", (e) => {
  if (e.target.value > 0)
    textStack[txtStackIndex].style.fontSize = e.target.value + "px";
});

text_box.addEventListener("dblclick", (e) => {
  if (e.target === text_box) {
    textStack.push(createTextBox(e.clientX, e.clientY));
    text_box.appendChild(textStack[txtStackIndex]);
  }
  if (textStack.length >1) {
    txtStackIndex--
    if (textStack[txtStackIndex].innerHTML === "") {
      text_box.children[txtStackIndex].remove();
      textStack.shift();
    }
  }
});

addTableBtn.addEventListener("click", (e) => {
  e.target.parentElement.style.display = "none";
  createTable();
});

function resetAlignText(x) {
  if (x.classList.contains("align")) {
    alignText.forEach((item) => {
      if (item !== x) {
        item.classList.remove("active");
        textStack[txtStackIndex].classList.remove(
          item.getAttribute("data-style")
        );
      }
    });
  }
}

function createTextBox(x, y) {
  const p = document.createElement("p");
  p.autofocus = "true";
  p.contentEditable = "true";
  p.style.border = "1px solid red";
  p.style.resize = "both";
  p.style.overflow = "hidden";
  p.style.position = "absolute";
  p.style.width = "100px";
  p.style.outline = "none";
  p.style.left = x - text_box.offsetLeft + "px";
  p.style.top = y - text_box.offsetTop + "px";
  txtStackIndex++;
  p.addEventListener("dblclick", () => {
    p.classList.toggle("move");
    if (p.classList.contains("move")) {
      p.style.cursor = "move";
    } else {
      p.style.cursor = "default";
    }
  });
  p.addEventListener("mousemove", (e) => {
    if (p.classList.contains("move")) {
      p.style.left = e.clientX - 10 - text_box.offsetLeft + "px";
      p.style.top = e.clientY - 10 - text_box.offsetTop + "px";
    }
  });

  return p;
}

function createRemoveBtn() {
  const btn = document.createElement("i");
  btn.className = "remove ";
}

function createTable() {
  let col = +document.getElementById("col").value;
  let row = +document.getElementById("row").value;
  let table = document.createElement("table");
  table.style.resize = "both";
  table.style.overflow = "hidden";
  table.style.position = "absolute";

  for (let i = 0; i < col; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < row; j++) {
      let td = document.createElement("td");
      td.style.width = "100px";
      td.style.height = "20px";
      td.contentEditable = "true";
      td.style.border = "1px solid red";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  text_box.appendChild(table);
}
function addFontStyle() {}
