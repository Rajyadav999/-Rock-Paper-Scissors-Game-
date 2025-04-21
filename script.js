function speak(text) {
    speechSynthesis.cancel();
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

let user = 0;
let computer = 0;
let draw = 0;

const choices = document.querySelectorAll(".choice");
let winner = document.getElementById("msg");
const add = document.getElementById("user-score");
const sub = document.getElementById("comp-score");
const draws = document.getElementById("draw");
const roundInput = document.getElementById("round");


const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawgame = () => {
    console.log("Game is a Draw!");
    winner.innerText = "It's a Draw!";
    winner.style.backgroundColor = "grey";
    draw += 1;
    draws.innerHTML = draw;
};

const showWinner = (userWin) => {
    if (userWin) {
        console.log("User wins");
        winner.innerText = "The winner of the round is You";
        user += 1;
        add.innerText = user;
        winner.style.backgroundColor = "green";
        
    } else {
        console.log("Computer wins");
        winner.innerText = "The winner of the round is Computer";
        computer += 1;
        sub.innerText = computer;
        winner.style.backgroundColor = "red";
        
    }
};

const playgame = (userChoice) => {
    const CompChoice = genCompChoice();
    if (userChoice === CompChoice) {
        drawgame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = CompChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = CompChoice === "scissors" ? false : true;
        } else {
            userWin = CompChoice === "rock" ? false : true;
        }
        showWinner(userWin);
    }
};



// Store number of rounds globally and a counter
let totalRounds = 0;
let roundsPlayed = 0;

// When any choice is clicked
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");

        if (roundInput.value === "") {
            alert("First Enter the Number!");
            roundInput.focus();
            return;
        }

        if (totalRounds === 0) {
            totalRounds = parseInt(roundInput.value);
            roundsPlayed = 0;
            console.log(`Total rounds to play: ${totalRounds}`);
        }

        if (roundsPlayed < totalRounds) {
            playgame(userChoice);
            roundsPlayed++;
        } 
        else{
            if (user>computer){
               
             winner.innerHTML=` 🥳🥳Final Winner is You ${user}` ;
             speak("Congratulations! You are the final winner!");

            }
            else if (user<computer){
             winner.innerHTML=" 😔Final winner is Computer"
             speak("Computer is the final winner!");
            }
            else if (user == computer){
                winner.innerText = "🤝 It's a Final Draw!";
                speak("The game is a draw!");
            }
            alert("All rounds completed! Click the button to restart the game.");

       
             
            winner.style.backgroundColor="rgb(28, 100, 224)"
            roundInput.value="";
            
        } 
    });
});

// When 'msg' (start button) is clicked
winner.addEventListener("click", () => {
    if (roundInput.value === "") {
        alert("First Enter the Number!");
        roundInput.focus();
        return;
    } else {
        winner.innerText = "Game started!";
        user = 0;
        computer = 0;
        draw = 0;
        roundsPlayed = 0;
        totalRounds = parseInt(roundInput.value);

        add.innerText = user;
        sub.innerText = computer;
        draws.innerText = draw;
        console.log(`Entered number ${roundInput.value}`);
    }
});

