var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$("#level-title").on("click", function() {
    if (start === false) {
        start = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(".btn").on("click", function() {
    console.log("on event");
    if (start === true) {
        pressButton($(this));
    }
})

function pressButton(event) {
    console.log("pressButton");
    var userChosenColour = event.attr("id");
    userClickedPattern.push(userChosenColour);
        
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
    console.log("checkAnswer");
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("callback");
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Click to Restart");
        startOver();
    }
}

function nextSequence() {
    console.log("nextSequence");
    if (start === true) {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
    
        var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
        gamePattern.push(randomChosenColour);
    
        playSound(randomChosenColour);
        animatePress(randomChosenColour);
    
        console.log(gamePattern);
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    start = false;
}