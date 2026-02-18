let stage = "start";

const storyText = document.getElementById("storyText");
const userInput = document.getElementById("userInput");
const storyImage = document.getElementById("storyImage");
const hint = document.getElementById("hint");

/* ---------- FUNCTIONS ---------- */

// Updates DOM + styles
function updatePage(text, image, choices, bgColor) {
  storyText.innerText = text;
  storyImage.src = image;
  hint.innerText = `Choices: ${choices}`;
  document.body.style.backgroundColor = bgColor;
}

// Returns cleaned input
function getCleanInput() {
  return userInput.value.trim().toLowerCase();
}

// Restart helper
function resetStory() {
  stage = "start";

  // Loop requirement
  let elements = [storyText, storyImage, userInput];
  let i = 0;
  while (i < elements.length) {
    elements[i].style.filter = "brightness(100%)";
    i++;
  }

  updatePage(
    "You are walking down a quiet dirt road in rural Japan. Ahead, the road splits. Do you go LEFT or RIGHT?",
    "https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-an-autumnseason-rural-road-in-japan-image_2525851.jpg",
    "left / right",
    "#f4ece1"
  );
}

/* ---------- INITIAL LOAD ---------- */
resetStory();

/* ---------- INPUT HANDLER ---------- */
userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const choice = getCleanInput();
    userInput.value = "";
    handleStory(choice);
  }
});

/* ---------- STORY LOGIC ---------- */
function handleStory(choice) {

  // START
  if (stage === "start") {
    if (choice === "left") {
      stage = "village";
      updatePage(
        "You arrive at a peaceful village. A familiar gate stands nearby. Do you VISIT your friend or CONTINUE walking?",
        "https://img.freepik.com/premium-photo/rural-japanese-village-scene-with-traditional-houses-dirt-path-trees-perfect-travel_1303267-575.jpg?w=1380",
        "visit / continue",
        "#eef5e1"
      );
    } else if (choice === "right") {
      stage = "fuji_road";
      updatePage(
        "The road stretches toward Mount Fuji. The air grows quiet. Do you WALK or REST?",
        "https://i.pinimg.com/originals/7a/cc/19/7acc19eaa9224542bc60968ca3722e24.jpg",
        "walk / rest",
        "#e1f1f5"
      );
    }

  // VILLAGE
  } else if (stage === "village") {
    if (choice === "visit") {
      stage = "inside_house";
      updatePage(
        "Your friend welcomes you inside. They are preparing New Year celebrations. Do you play traditional GAMES or go back OUTSIDE?",
        "https://www.koryoya.com/akiya/list/yabu-1.jpg",
        "games / outside",
        "#fdf2e9"
      );
    } else if (choice === "continue") {
      stage = "end";
      updatePage(
        "You continue on and reach a clearing. Mount Fuji stands before you.",
        "https://japanupclose.web-japan.org/files/100462016.jpeg",
        "restart",
        "#ffffff"
      );
    }

  // INSIDE HOUSE (switch requirement)
  } else if (stage === "inside_house") {
    switch (choice) {
      case "games":
        stage = "end";
        updatePage(
          "You spend the afternoon playing Hanetsuki and Karuta. Laughter fills the home.",
          "https://savvytokyo.com/traditional-games-to-celebrate-the-new-year-in-japan/",
          "restart",
          "#f9d5e5"
        );
        break;

      case "outside":
        stage = "start";
        resetStory();
        break;
    }

  // FUJI ROAD
  } else if (stage === "fuji_road") {
    if (choice === "rest") {
      stage = "dog";
      updatePage(
        "You sit on a bench and meet a friendly dog—it belongs to your friend! Do you SIT with him or RETURN to the house?",
        "https://thumbs.dreamstime.com/b/shiba-inu-dog-sitting-bench-japanese-garden-188613437.jpg",
        "sit / return",
        "#e8f4ea"
      );
    } else if (choice === "walk") {
      stage = "end";
      updatePage(
        "You pass beneath a torii gate at Mount Fuji. Enjoy the rest of your journey.",
        "https://japanupclose.web-japan.org/files/100462016.jpeg",
        "restart",
        "#ffffff"
      );
    }

  // DOG ENCOUNTER
  } else if (stage === "dog") {
    if (choice === "sit") {
      stage = "end";
      updatePage(
        "The dog wags its tail as you pet it. You feel completely at peace.",
        "https://thumbs.dreamstime.com/b/shiba-inu-dog-sitting-bench-japanese-garden-188613437.jpg",
        "restart",
        "#f4ece1"
      );
    } else if (choice === "return") {
      stage = "inside_house";
      updatePage(
        "You return to your friend's house together. Warm light glows from inside.",
        "https://www.koryoya.com/akiya/list/yabu-1.jpg",
        "games / outside",
        "#fdf2e9"
      );
    }

  // RESTART
  } else if (stage === "end" && choice === "restart") {
    resetStory();
  }
}
