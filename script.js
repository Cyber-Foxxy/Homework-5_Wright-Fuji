let stage = "start";

const storyText = document.getElementById("storyText");
const userInput = document.getElementById("userInput");
const storyImage = document.getElementById("storyImage");
const hint = document.getElementById("hint");

// Function that updates the DOM and Styles (Requirement)
function updatePage(text, imgUrl, nextHint, bodyColor) {
    storyText.innerText = text;
    storyImage.src = imgUrl;
    hint.innerText = `Choices: ${nextHint}`;
    document.body.style.backgroundColor = bodyColor;
}

// Function returning a value (Requirement)
function getCleanInput() {
    return userInput.value.toLowerCase().trim();
}

userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const choice = getCleanInput();
        userInput.value = ""; 
        handleStory(choice);
    }
});

function handleStory(choice) {
    // 1. Initial Choice
    if (stage === "start") {
        if (choice === "left") {
            stage = "village";
            updatePage(
                "You arrive at a peaceful village. You see a familiar gate. Do you VISIT your friend or CONTINUE walking?",
                "https://img.freepik.com/premium-photo/rural-japanese-village-scene-with-traditional-houses-dirt-path-trees-perfect-travel_1303267-575.jpg?w=1380",
                "visit / continue",
                "#eef5e1"
            );
        } else if (choice === "right") {
            stage = "fuji_road";
            updatePage(
                "The road continues toward the mountain. The air grows quiet. Do you WALK or REST?",
                "https://i.pinimg.com/originals/7a/cc/19/7acc19eaa9224542bc60968ca3722e24.jpg",
                "walk / rest",
                "#e1f1f5"
            );
        }

    // 2. Village / Friend Branch
    } else if (stage === "village") {
        if (choice === "visit") {
            stage = "inside_house";
            updatePage(
                "Your friend welcomes you warmly! Inside, they are preparing New Year celebrations. Do you play traditional GAMES or go back OUTSIDE?",
                "https://www.koryoya.com/akiya/list/yabu-1.jpg",
                "games / outside",
                "#fdf2e9"
            );
        } else if (choice === "continue") {
            stage = "fuji_view";
            updatePage(
                "You bypass the village and finally reach a clearing. Mount Fuji stands before you!",
                "https://japanupclose.web-japan.org/files/100462016.jpeg",
                "restart",
                "#fff"
            );
        }

    // 3. Inside House Branch (Using Switch Statement Requirement)
    } else if (stage === "inside_house") {
        switch(choice) {
            case "games":
                stage = "end";
                updatePage(
                    "You spend the afternoon playing Hanetsuki and Karuta! It is a wonderful way to celebrate.",
                    "https://savvytokyo.com/traditional-games-to-celebrate-the-new-year-in-japan/",
                    "restart",
                    "#f9d5e5"
                );
                break;
            case "outside":
                stage = "start";
                handleStory("restart");
                break;
        }

    // 4. Fuji Road Branch
    } else if (stage === "fuji_road") {
        if (choice === "rest") {
            stage = "dog_encounter";
            updatePage(
                "You look over at a nearby bench to rest and see a friendly dog. You suddenly recognize that its your friends dog! Do you SIT and pet him or RETURN to the friends house with him?",
                "https://thumbs.dreamstime.com/b/shiba-inu-dog-sitting-bench-japanese-garden-188613437.jpg",
                "sit / return",
                "#e8f4ea"
            );
        } else if (choice === "walk") {
            stage = "end";
            updatePage(
                "You have arrived at the Tori Gate of Mount Fuji, enjoy the rest of your visit!",
                "https://japanupclose.web-japan.org/files/100462016.jpeg",
                "restart",
                "#fff"
            );
        }

    // 5. Dog Interaction Branch
    } else if (stage === "dog_encounter") {
        if (choice === "sit") {
            stage = "end";
            updatePage("The dog wags its tail as you pet it. You feel completely relaxed in nature.", "https://thumbs.dreamstime.com/b/shiba-inu-dog-sitting-bench-japanese-garden-188613437.jpg", "restart", "#f4ece1");
        } else if (choice === "return") {
            // Jumps to the friend's house stage
            stage = "inside_house";
            handleStory("visit");
        }

    // 6. Restart Logic (Loop Requirement)
    } else if (choice === "restart") {
        // Demonstrative loop to reset UI brightness
        let uiElements = [storyText, storyImage, userInput];
        let i = 0;
        while(i < uiElements.length) {
            uiElements[i].style.filter = "brightness(100%)";
            i++;
        }

        stage = "start";
        updatePage(
            "You are back on the dirt road. The sun is rising. Do you go LEFT or RIGHT?",
            "https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-an-autumnseason-rural-road-in-japan-image_2525851.jpg",
            "left / right",
            "#f4ece1"
        );
    }
}
            "#f4ece1"
        );
    }
}
