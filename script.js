

let icons = document.querySelectorAll("i");
let text_box = document.getElementById("text-box");
let textInput = document.getElementById("inputText");

let textArr = [createElement("span",changeStyleOfText() )];
let index = 0;
let text = "";
let isStartWriting = true;

icons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
    console.log(textArr);
    if (e.target.getAttribute("data-style")==="bold"&&e.target.classList.contains("active")) {
      index=textArr.length
      textArr.push(createElement("span",changeStyleOfText() ));
      textArr[index].classList.add("bold");
    }
    if (e.target.getAttribute("data-style")==="italic"&&e.target.classList.contains("active")) {
      index=textArr.length
      textArr.push(createElement("span",changeStyleOfText() ));
      textArr[index].classList.add("italic");
    }
    if (e.target.getAttribute("data-style")==="underline"&&e.target.classList.contains("active")) {
      index=textArr.length
      textArr.push(createElement("span",changeStyleOfText() ));
      textArr[index].classList.add("underline");
    }
    if (e.target.getAttribute("data-style")==="strikethrough"&&e.target.classList.contains("active")) {
      index=textArr.length
      textArr.push(createElement("span",changeStyleOfText() ));
      textArr[index].classList.add("italic");
    }
    if (e.target.getAttribute("data-style") === "center" &&e.target.classList.contains("active")) {
      textArr[index].classList.add("center");
      textArr[index].classList.remove("left")
      textArr[index].classList.remove("right")
    }
    if (e.target.getAttribute("data-style") === "left" &&e.target.classList.contains("active")) {
      textArr[index].classList.add("left");
      textArr[index].classList.remove("center");
      textArr[index].classList.remove("right")

    }
    if (e.target.getAttribute("data-style") === "right" &&e.target.classList.contains("active")) {
      textArr[index].classList.add("right");
      textArr[index].classList.remove("center");
      textArr[index].classList.remove("left")
    }
    if (e.target.getAttribute("data-style") === "ol" &&e.target.classList.contains("active")) {
    }
    if (e.target.getAttribute("data-style") === "ul" &&e.target.classList.contains("active")) {
    }
    isStartWriting=true;
    textInput.focus()
    setDataInTextBox();
  });
});

addEventListener("keydown", (e) => {
  if (e.key==="Enter") {
    index=textArr.length-1
    textArr[index].innerHTML += textInput.value;
    textInput.value="";
    textArr.push(createElement("br",""));
    textArr.push(createElement("span", changeStyleOfText()));
  } else if (e.key === "Backspace") {
  }
  index=textArr.length-1
  textArr[index].innerHTML += textInput.value;
  textInput.value="";
  setDataInTextBox();
});

function createElement(el,classes) {
  let span=document.createElement(el);
  span.className="spanText "+classes
  span.setAttribute("contenteditable","true")
  return span;
}

function setDataInTextBox() {
  let len=textArr.length;
  console.log(textArr);
  resetText() 
  for (let i=0; i<len; i++){
    console.log(textArr[i],i)
    text_box.insertBefore(textArr[i],textInput)
  }
}

//reset text to set new text
function resetText() {
  let spanText=document.querySelectorAll("spanText")
  let len=spanText.length
  for (let i=0; i<len; i++){
    spanText[i].remove()
  }
}

function changeStyleOfText() {
  let classes=""
  icons.forEach(item => {
    if (item.classList.contains("active")) {
      classes+=" "+item.getAttribute("data-style")
    }
  })
  return classes
}

text_box.addEventListener("click", (e) => {
  if(e.target===text_box)textInput.focus()
})
