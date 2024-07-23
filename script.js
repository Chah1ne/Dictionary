// console.log("hlwww?");

let inputField = document.querySelector("#input");
let infoPara = document.querySelector("#info-para");
let contentBox = document.querySelector(".content-box");

inputField.addEventListener("keyup", (e) => {
  let word = e.target.value.replace(/\s+/g, " ");
  if (e.key == "Enter" && word) {
    // console.log(word);
    contentBox.style.display = "none";
    fetchMeaning(word);
  }
});

function fetchMeaning(word) {
  infoPara.innerHTML = "Searching...";
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => data(result, word))
    .catch(() => {
      infoPara.innerHTML = "Could not find the meaning of this word";
    });
}

function data(result, word) {
  inputField.value = word;
  infoPara.innerHTML = "";
  if (result.title) {
    infoPara.innerHTML = "Could not find the meaning of this word";
    contentBox.style.display = "none";
    // console.log("na milo");
  } else {
    contentBox.style.display = "block";
    let definitions = result[0].meanings[0].definitions[0];
    document.querySelector(".word-meaning h2").innerHTML = word;
    document.querySelector(".word-meaning span").innerHTML = result[0].phonetic;
    document.querySelector(".content .meaning").innerHTML =
      definitions.definition;

    // Example
    let exampleId = document.querySelector(".content #example");
    let exampleClass = document.querySelector(".content .example");
    if (definitions.example == undefined) {
      exampleClass.style.display = "none";
      exampleId.style.display = "none";
    } else {
      exampleClass.style.display = "block";
      exampleId.style.display = "block";
      exampleClass.innerHTML = definitions.example;
    }

    let synonyms = result[0].meanings[0].synonyms;
    let synonymsTag = document.querySelector(".content .synonyms");
    synonymsTag.innerHTML = "";
    if (synonyms.length == 0) {
      document.querySelector(".content #synonyms").style.display = "none";
    } else {
      document.querySelector(".content #synonyms").style.display = "block";
      for (let i = 0; i < synonyms.length; i++) {
        synonymsTag.innerHTML += `<span class="synonyms" onclick="fetchMeaning('${synonyms[i]}')">${synonyms[i]}  , </span> `;
      }
    }
  }
}
