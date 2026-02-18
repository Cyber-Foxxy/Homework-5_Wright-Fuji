let stage = 0;
let playing = true;

const storyText = document.getElementById("storyText");
const userInput = document.getElementById("userInput");
const storyImage = document.getElementById("storyImage");
const hint = document.getElementById("hint");

/* ---------- FUNCTIONS ---------- */

// Updates story text, image, and background
function updateScene(text, imageUrl, hintText, bgColor) {
  storyText.innerText = text;
  storyImage.src = imageUrl;
  hint.innerText = hintText;
  document.body.style.background = bgColor;
}

// Cleans user input
function normalizeInput(input) {
  return input.trim().toLowerCase();
}

// Function that RETURNS a value
function wantsRestart(answer) {
  return answer === "yes";
}

/* ---------- INITIAL SCENE ---------- */
updateScene(
  "You are walking down a quiet dirt road in rural Japan. Ahead, the road splits into two paths. Do you go LEFT or RIGHT?",
  "https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-an-autumnseason-rural-road-in-japan-image_2525851.jpg",
  "Choices: left / right",
  "linear-gradient(#f3efe6, #d8cfc0)"
);

/* ---------- INPUT HANDLING ---------- */
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && playing) {
    const choice = normalizeInput(userInput.value);
    userInput.value = "";

    /* ---------- STAGE LOGIC ---------- */
    if (stage === 0) {
      if (choice === "left") {
        stage = 1;
        updateScene(
          "You head left and arrive at a peaceful village. Do you VISIT a friend's house or CONTINUE walking?",
          "https://img.freepik.com/premium-photo/rural-japanese-village-scene-with-traditional-houses-dirt-path-trees-perfect-travel_1303267-575.jpg?w=1380",
          "Choices: visit / continue",
          "linear-gradient(#f5efe0, #e0d1b5)"
        );
      } else if (choice === "right") {
        stage = 2;
        updateScene(
          "You continue down the road toward Mount Fuji. The path grows quiet. Do you REST or KEEP WALKING?",
          "https://i.pinimg.com/originals/7a/cc/19/7acc19eaa9224542bc60968ca3722e24.jpg",
          "Choices: rest / walk",
          "linear-gradient(#dde8f0, #b7c9d6)"
        );
      } else {
        storyText.innerText = "Please type LEFT or RIGHT.";
      }

    } else if (stage === 1) {
      switch (choice) {
        case "visit":
          stage = 3;
          updateScene(
            "Your friend welcomes you warmly into their home. You feel safe and at peace.",
            "https://www.koryoya.com/akiya/list/yabu-1.jpg",
            "The journey ends here. Type YES to restart.",
            "linear-gradient(#f2eadf, #d6c4a8)"
          );
          break;

        case "continue":
          stage = 4;
          updateScene(
            "You leave the village and walk until Mount Fuji appears in the distance.",
            "https://japanupclose.web-japan.org/files/100462016.jpeg",
            "The journey ends here. Type YES to restart.",
            "linear-gradient(#e6f2f2, #bfdada)"
          );
          break;

        default:
          storyText.innerText = "Choose VISIT or CONTINUE.";
      }

    } else if (stage >= 2) {
      playing = false;

      // Loop requirement (runs once but demonstrates loop usage)
      let loopCount = 0;
      while (loopCount < 1) {
        hint.innerText = "Would you like to start again? (yes / no)";
        loopCount++;
      }

      userInput.addEventListener("keydown", function restart(e) {
        if (e.key === "Enter") {
          const restartChoice = normalizeInput(userInput.value);
          userInput.value = "";

          if (wantsRestart(restartChoice)) {
            location.reload();
          } else {
            storyText.innerText = "Thank you for walking the road.";
            hint.innerText = "";
            userInput.style.display = "none";
          }
        }
      });
    }
  }
});
