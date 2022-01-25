function randomiser(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// const top100words = [
//   "can",
//   "can't",
//   "allow",
//   "always",
//   "never",
//   "every",
//   "only",
//   "other",
//   "many",
//   "few",
//   "will",
//   "should",
//   "some",
//   "more",
//   "another",
//   "must",
//   "show",
//   "happen",
//   "true",
//   "false",
//   "correct",
//   "incorrect",
//   "sure",
//   "unsure",
//   "know",
//   "say",
//   "think",
//   "choose",
//   "decide",
//   "agree",
//   "disagree",
//   "need",
//   "want",
//   "like",
//   "dislike",
//   "useful",
//   "yes",
//   "no",
//   "maybe",
//   "each",
//   "okay",
//   "same",
//   "different",
//   "change",
//   "sometimes",
//   "anyway",
//   "again",
//   "thing",
//   "anything",
//   "everything",
//   "something",
//   "with",
//   "without",
//   "explain",
//   "continue",
//   "about",
//   "for",
//   "against",
//   "have",
//   "do",
//   "but",
//   "if",
//   "tell",
//   "believe",
//   "really",
//   "reason",
//   "because",
//   "remember",
//   "forgot",
//   "enough",
//   "include",
//   "recognise",
//   "follow",
//   "question",
//   "answer",
//   "ask",
//   "what",
//   "why",
//   "when",
//   "how",
//   "who",
//   "where",
//   "which",
//   "discuss",
//   "sorry",
//   "please",
//   "thanks",
//   "bye",
// ];

const wordList184words = [
  "can",
  "can't",
  "allow",
  "always",
  "never",
  "every",
  "only",
  "other",
  "many",
  "few",
  "will",
  "should",
  "some",
  "more",
  "another",
  "must",
  "show",
  "happen",
  "true",
  "false",
  "correct",
  "incorrect",
  "sure",
  "unsure",
  "know",
  "say",
  "think",
  "choose",
  "decide",
  "agree",
  "disagree",
  "need",
  "want",
  "like",
  "dislike",
  "useful",
  "yes",
  "no",
  "maybe",
  "each",
  "okay",
  "same",
  "different",
  "change",
  "sometimes",
  "anyway",
  "again",
  "thing",
  "anything",
  "everything",
  "something",
  "with",
  "without",
  "explain",
  "continue",
  "about",
  "for",
  "against",
  "have",
  "do",
  "but",
  "if",
  "tell",
  "believe",
  "really",
  "reason",
  "because",
  "remember",
  "forgot",
  "enough",
  "include",
  "recognise",
  "follow",
  "question",
  "answer",
  "ask",
  "what",
  "why",
  "when",
  "how",
  "who",
  "where",
  "which",
  "discuss",
  "sorry",
  "please",
  "thanks",
  "bye",
  "time",
  "year",
  "people",
  "way",
  "day",
  "man",
  "woman",
  "life",
  "child",
  "world",
  "school",
  "state",
  "family",
  "student",
  "group",
  "country",
  "problem",
  "hand",
  "part",
  "place",
  "case",
  "week",
  "company",
  "system",
  "program",
  "work",
  "government",
  "number",
  "night",
  "point",
  "home",
  "water",
  "room",
  "mother",
  "area",
  "money",
  "story",
  "fact",
  "month",
  "lot",
  "right",
  "study",
  "book",
  "eye",
  "job",
  "word",
  "business",
  "issue",
  "side",
  "kind",
  "head",
  "house",
  "service",
  "friend",
  "father",
  "power",
  "hour",
  "game",
  "line",
  "end",
  "member",
  "law",
  "car",
  "city",
  "community",
  "name",
  "president",
  "team",
  "minute",
  "idea",
  "kid",
  "body",
  "information",
  "back",
  "parent",
  "face",
  "others",
  "level",
  "office",
  "door",
  "health",
  "person",
  "art",
  "war",
  "history",
  "party",
  "result",
  "morning",
  "research",
  "girl",
  "guy",
  "moment",
  "air",
  "teacher",
  "force",
  "education",
];

const randomWords = randomiser(wordList184words);

async function getMp4LinkFromWord(word) {
  const response = await fetch(
    `https://signlanguage-api.herokuapp.com/video/${word}`
  );
  const jsonBody = await response.json();
  const mp4Source = "https://bslsignbank.ucl.ac.uk" + jsonBody.data.link;
  const relatedWords = jsonBody.data.words;

  const videoHTML = `<video autoplay muted loop width='320px' src=${mp4Source}></video><p class='words'>${relatedWords}</p>`;
  return videoHTML;
}

async function replacer() {
  const textElements = document.querySelectorAll("p, span, a, li");
  let wordsLearningCount = 0;
  const wordsOnCurrentPage = [];

  for (const word of randomWords) {
    let wordAppearances = 0;
    // ensures only 3 unique random words are given signs on each page
    if (wordsLearningCount === 3) {
      break;
    }

    for (let element of textElements) {
      if (element.innerHTML.includes(` ${word} `)) {
        wordAppearances++;
        // ensures for a given word, user is only shown its sign max 3 times
        if (wordAppearances > 3) {
          break;
        }
        if (!wordsOnCurrentPage.includes(word)) {
          wordsOnCurrentPage.push(word);
          wordsLearningCount++;
        }

        // get that word's sign
        const vidHTML = await getMp4LinkFromWord(word);

        // find position in order to display tooltip above/below correctly
        let position = element.getBoundingClientRect();

        element.innerHTML = element.innerHTML.replace(
          ` ${word} `,
          ` <mark class='tooltip-${
            position.y < 200 ? "b" : "a"
          }'>${word}<span class='tooltiptext-${
            position.y < 200 ? "b" : "a"
          }'>${vidHTML}</span></mark> `
        );
      }
    }
  }
}
replacer();
