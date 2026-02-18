let stage = "start";

const storyText = document.getElementById("storyText");
const userInput = document.getElementById("userInput");
const storyImage = document.getElementById("storyImage");
const hint = document.getElementById("hint");

function updatePage(text, imgUrl, nextHint, bodyColor) {
    storyText.innerText = text;
    storyImage.src = imgUrl;
    hint.innerText = `Choices: ${nextHint}`;
    document.body.style.backgroundColor = bodyColor;
}

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
    // --- STARTING PATH ---
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
                "The road continues toward the mountain. The air gets colder. Do you WALK faster or REST?",
                "https://i.pinimg.com/originals/7a/cc/19/7acc19eaa9224542bc60968ca3722e24.jpg",
                "walk / rest",
                "#e1f1f5"
            );
        }

    // --- VILLAGE SUB-BRANCH ---
    } else if (stage === "village") {
        if (choice === "visit") {
            stage = "inside_house";
            updatePage(
                "Your friend welcomes you! Inside, they are preparing New Year celebrations. Do you play traditional GAMES or go back OUTSIDE?",
                "https://www.koryoya.com/akiya/list/yabu-1.jpg",
                "games / outside",
                "#fdf2e9"
            );
        } else if (choice === "continue") {
            stage = "fuji_view";
            updatePage(
                "You bypass the village and reach a clearing. Mount Fuji stands before you!",
                "https://japanupclose.web-japan.org/files/100462016.jpeg",
                "restart",
                "#fff"
            );
        }

    } else if (stage === "inside_house") {
        if (choice === "games") {
            updatePage(
                "You spend the afternoon playing Hanetsuki and Karuta! It's a wonderful celebration.",
                "https://savvytokyo.com/traditional-games-to-celebrate-the-new-year-in-japan/",
                "restart",
                "#f9d5e5"
            );
            stage = "end";
        } else if (choice === "outside") {
            stage = "start"; // Loop back to beginning
            handleStory("restart");
        }

    // --- MOUNT FUJI SUB-BRANCH ---
    } else if (stage === "fuji_road") {
        if (choice === "rest") {
            stage = "dog_encounter";
            updatePage(
                "You look over at a nearby bench to rest and see a friendly dog. You suddenly recognize that its your friends dog!",
                "https://scontent-sea1-1.xx.fbcdn.net/v/t39.30808-6/241535451_3796362537093567_6403070497554558223_n.jpg?_nc_cat=106&ccb=1-7&_ea&_nc_sid=5f2048&_nc_ohc=F8H7K6M7_WcAX9W5S7_&_nc_ht=scontent-sea1-1.xx&oh=00_AfC2D6k0k7r5v5z2...", // Direct image link from FB group post
                "sit / return",
                "#e8f4ea"
            );
        } else if (choice === "walk") {
            stage = "fuji_view";
            updatePage(
                "You have arrived at the Tori Gate of Mount Fuji, enjoy the rest of your visit!",
                "https://japanupclose.web-japan.org/files/100462016.jpeg",
                "restart",
                "#fff"
            );
        }

    } else if (stage === "dog_encounter") {
        if (choice === "sit") {
            updatePage("You sit and pet the dog. He is very soft and happy to see you.", "https://scontent-sea1-1.xx...", "restart", "#f4ece1");
            stage = "end";
        } else if (choice === "return") {
            stage = "inside_house"; // Takes them to the village house branch
            handleStory("visit");
        }

    // --- RESTART LOGIC ---
    } else if (choice === "restart") {
        stage = "start";
        updatePage(
            "You are back on the dirt road. Do you go LEFT or RIGHT?",
            "https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-an-autumnseason-rural-road-in-japan-image_2525851.jpg",
            "left / right",
            "#f4ece1"
        );
    }
}
