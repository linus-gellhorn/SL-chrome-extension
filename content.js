console.log("Chrome extension running!");

window.addEventListener("mouseup", wordSelected);

const wordList = ["colour", "print", "writing"];

let myDataList;

async function getMp4LinkFromWord(word) {
  const response = await fetch(
    `https://signlanguage-api.herokuapp.com/video/${word}`
  );
  const jsonBody = await response.json();
  const mp4Source = "https://bslsignbank.ucl.ac.uk" + jsonBody.data;

  const videoHTML = `<video autoplay muted loop width='400px' src=${mp4Source}></video>`;
  return videoHTML;
}

async function replacer() {
  const textElements = document.querySelectorAll("h1, h2, h3, p, span, a, li");
  for (let element of textElements) {
    for (const word of wordList) {
      if (element.innerHTML.includes(word)) {
        const vidHTML = await getMp4LinkFromWord(word);
        console.log(vidHTML);
        element.innerHTML = element.innerHTML.replace(
          word,
          `<mark class='tooltip'>${word}<span class='tooltiptext'>${vidHTML}</span></mark>`
        );
      }
    }
  }
}
replacer();

function wordSelected() {
  let selectedText = window.getSelection().toString().trim();
  console.log(selectedText);
  if (selectedText.length > 0) {
    let message = {
      text: selectedText,
    };
    chrome.runtime.sendMessage(message);
  }
}

// const tooltipDiv = document.createElement("div");
// tooltipDiv.className = "tooltip";
// tooltipDiv.id = "123";
// tooltipDiv.innerHTML = "Hover over me";
// document.body.appendChild(tooltipDiv);

// const tooltipText = document.createElement("span");
// tooltipText.className = "tooltiptext";
// tooltipText.innerHTML =
//   "<video autoplay muted loop width='400px' src='https://bslsignbank.ucl.ac.uk/media/bsl-video/CO/COLD.mp4'></video>";
// document.getElementById("123").appendChild(tooltipText);
