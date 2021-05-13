var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;
document.getElementById("startreset").onclick =
    function() {
        if (playing == true) {
            location.reload(); //reload page
        } else { //if were not playing
            playing = true; //change mode to playing
            score = 0;
            document.getElementById("scorevalue").innerHTML = score;
            generateQA();
            show("time");
            hide("gameover");
            //change button to reset
            document.getElementById("startreset").innerHTML = "Reset Game";
            timeRemaining = 60;
            document.getElementById("time-value").innerHTML = timeRemaining;
            startCountdown();
        }
    }

function startCountdown() {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("time-value").innerHTML = timeRemaining;
        if (timeRemaining == 0) {
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>your score is " + score + " .</p>";
            hide("time");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }

    }, 1000)
}

function stopCountdown() {
    clearInterval(action);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}

function generateQA() {
    var x = Math.round(9 * Math.random()) + 1;
    var y = Math.round(9 * Math.random()) + 1;
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctPosition = Math.round(3 * Math.random()) + 1;
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with correct answer
    //fill other boxes with wrong answer
    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (Math.round(9 * Math.random()) + 1) * (Math.round(9 * Math.random()) + 1);
            } while (answers.indexOf(wrongAnswer) > -1)
            answers.push(wrongAnswer);
            document.getElementById("box" + i).innerHTML = wrongAnswer;
        }
    }

}
//clicking on answer box
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick =
        function() {
            //check if we are playing
            if (playing == true) {
                if (this.innerHTML == correctAnswer) {
                    score++;
                    document.getElementById("scorevalue").innerHTML = score;
                    //show correctAnswer
                    show("correct");
                    hide("wrong");
                    setTimeout(function() {
                        hide("correct");
                    }, 1000)
                    generateQA();
                } else {
                    show("wrong");
                    hide("correct");
                    setTimeout(function() {
                        hide("wrong");
                    }, 1000);
                }
            }
        }
}