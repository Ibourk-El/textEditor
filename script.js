let icons = document.querySelectorAll("i");
let text_box = document.getElementById("text-box");
let textInput = document.getElementById("inputText");

let textArr = [createElement("span", "spanText", changeStyleOfText())];
let paragraph = [createElement("p", "paragraph", "")];
let paraIndex;
let index = 0;
let text = "";
let isStartWriting = true;

icons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    if (
      e.target.getAttribute("data-style") === "bold" &&
      e.target.classList.contains("active")
    ) {
      index = textArr.length;
      textArr.push(createElement("span", "spanText", changeStyleOfText()));
      textArr[index].classList.add("bold");
    }
    if (
      e.target.getAttribute("data-style") === "italic" &&
      e.target.classList.contains("active")
    ) {
      index = textArr.length;
      textArr.push(createElement("span", "spanText", changeStyleOfText()));
      textArr[index].classList.add("italic");
    }
    if (
      e.target.getAttribute("data-style") === "underline" &&
      e.target.classList.contains("active")
    ) {
      index = textArr.length;
      textArr.push(createElement("span", "spanText", changeStyleOfText()));
      textArr[index].classList.add("underline");
    }
    if (
      e.target.getAttribute("data-style") === "strikethrough" &&
      e.target.classList.contains("active")
    ) {
      index = textArr.length;
      textArr.push(createElement("span", "spanText", changeStyleOfText()));
      textArr[index].classList.add("italic");
    }
    if (
      e.target.getAttribute("data-style") === "center" &&
      e.target.classList.contains("active")
    ) {
      paragraphStyle("center", "left", "right");
    }
    if (
      e.target.getAttribute("data-style") === "left" &&
      e.target.classList.contains("active")
    ) {
      paragraphStyle("left", "right", "center");
    }
    if (
      e.target.getAttribute("data-style") === "right" &&
      e.target.classList.contains("active")
    ) {
      paragraphStyle("right", "left", "center");
    }
    if (
      e.target.getAttribute("data-style") === "ol" &&
      e.target.classList.contains("active")
    ) {
    }
    if (
      e.target.getAttribute("data-style") === "ul" &&
      e.target.classList.contains("active")
    ) {
    }
    isStartWriting = true;
    textInput.focus();
    setDataInTextBox();
  });
});

addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    removTextInInput();
    paragraph.push(createElement("p", "paragraph", ""));
    textArr = [];
    textArr.push(createElement("span", "spanText", changeStyleOfText()));
  } else if (e.key === "Backspace") {
  }
  removTextInInput();
  setTextInParagraph();
  setDataInTextBox();
});

function createElement(el, elClass, classes) {
  let span = document.createElement(el);
  span.className = elClass + " " + classes;
  span.setAttribute("contenteditable", "true");
  return span;
}

function setDataInTextBox() {
  let len = paragraph.length;
  console.log(paragraph);
  resetText("paragraph");
  for (let i = 0; i < len; i++) {
    text_box.appendChild(paragraph[i], textInput);
  }
}

function setTextInParagraph() {
  let len = textArr.length;
  console.log(textArr);
  resetText("spanText");
  for (let i = 0; i < len; i++) {
    console.log(textArr);
    paragraph[paragraph.length - 1].appendChild(textArr[i]);
  }
}
//
function resetActiveAlignText(add) {
  let alignIcons = document.getElementsByClassName("align");
  console.log(alignIcons);

  for (let i = 0; i < alignIcons.length; i++) {
    if (alignIcons[i].getAttribute("data-style") !== add)
    alignIcons[i].classList.remove("active");
  }
}
//
function paragraphStyle(add, r1, r2) {
  let len = paragraph.length - 1;
  paragraph[len].classList.add(add);
  paragraph[len].classList.remove(r1);
  paragraph[len].classList.remove(r2);
  resetActiveAlignText(add);
}
//
function removTextInInput() {
  index = textArr.length - 1;
  textArr[index].innerHTML += textInput.value;
  textInput.value = "";
}
//reset text to set new text
function resetText(classes) {
  let spanText = document.querySelectorAll(classes);
  let len = spanText.length;
  for (let i = 0; i < len; i++) {
    spanText[i].remove();
  }
}

function changeStyleOfText() {
  let classes = "";
  icons.forEach((item) => {
    if (item.classList.contains("active")) {
      classes += " " + item.getAttribute("data-style");
    }
  });
  return classes;
}

text_box.addEventListener("click", (e) => {
  if (e.target === text_box) textInput.focus();
});
