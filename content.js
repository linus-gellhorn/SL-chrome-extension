console.log("Chrome extension running!");

const wordList = ["colour", "print", "writing"];

let myDataList;

async function getMp4LinkFromWord(word) {
  const response = await fetch(
    `https://signlanguage-api.herokuapp.com/video/${word}`
  );
  const jsonBody = await response.json();
  const mp4Source = "https://bslsignbank.ucl.ac.uk" + jsonBody.data;

  const videoHTML = `<video autoplay muted loop width='320px' src=${mp4Source}></video>`;
  return videoHTML;
}

async function replacer() {
  const textElements = document.querySelectorAll("p, span, a, li");
  for (let element of textElements) {
    for (const word of wordList) {
      if (element.innerHTML.includes(word)) {
        // get that word's sign
        const vidHTML = await getMp4LinkFromWord(word);

        // find position in order to display tooltip above/below correctly
        let position = element.getBoundingClientRect();

        if (position.y < 200) {
          element.innerHTML = element.innerHTML.replace(
            word,
            `<mark class='tooltip-b'>${word}<span class='tooltiptext-b'>${vidHTML}</span></mark>`
          );
        } else {
          element.innerHTML = element.innerHTML.replace(
            word,
            `<mark class='tooltip-a'>${word}<span class='tooltiptext-a'>${vidHTML}</span></mark>`
          );
        }
      }
    }
  }
}
replacer();
