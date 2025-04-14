/* ------ IMAGE SLIDER START ------ */
beforeEffectslider({
    Selector: "#index-slider",
    BeforeImage: "images/index/typewriter.png", // Before Image
    AfterImage: "images/index/laptop.png", // After Image
    DragFrom: 60, // Percent % of before Image
    ButtonsText:{
        after:'After',
        before:'Before'
    },
});

// IMAGE SLIDER CSS ANIMATION (HOVER/LEAVE)
const slider = document.getElementById("index-slider");

// MOUSE ENTER
slider.addEventListener("mouseenter", () => {
    slider.className = "mouseEnter";
});

// MOUSE LEAVE
slider.addEventListener("mouseleave", () => {
    slider.className = "mouseLeave";
});

/* ------ IMAGE SLIDER END ------ */

/* ------ FOOTER TIME DISPLAY START ------ */
const timer = () => {
    let now = new Date();
    document.querySelector("#date").textContent =
        now.toLocaleTimeString();
    /* NOT needed for now, will come back to this code, though
    + " " +
    now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" }); */
}
setInterval(timer, 1000);
/* ------ FOOTER TIME DISPLAY END ------ */

/* ------ FACTORIAL CALCULATION START ------ */
const factorial = (field) => {
    // Using non-recursive fact. calculation here
    if (field === 0 || field === 1)
        return 1;

    // let total = 1
    for (let i = field-1; i > 1; i--) {
        field *= i;
    }
    return field;
}

/* RANDOM NUMBER SEGMENT START */
let randomNumber;

let randomNumberButton = document.getElementById("random-number");
randomNumberButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    // Defaulting to a max of 20, don't want to bring scientific notation into it
    randomNumber = Math.floor((Math.random()*20+1));

    /* When randomNumberButton selected, generate a random number and basically
      replace what exists in the user input text box. Does NOT call
       the actual factorial fx. itself. Not going to put this into a
        one-liner as will be difficult to follow. */
    document.getElementById("num").value = randomNumber;

    // Changing the output box.
    document.getElementById("factorial").value = factorial(randomNumber);
});

// Starting out with a random number, piece-mealed from the code above
document.getElementById("num").value = Math.floor((Math.random()*20+1));
document.getElementById("factorial").value = factorial(document.getElementById("num").value);
/* RANDOM NUMBER SEGMENT END */

/* CALCULATE FACTORIAL BUTTON START */
// UPDATES on click Event
let factorialFormEl = document.querySelector("form");
factorialFormEl.addEventListener("click", (evt) => {
    evt.preventDefault(); // No submit!

    let userInput = document.getElementById("num");
    let userInputNum = parseInt(userInput.value); // needs to be .value

    let userFactCalc = factorial(userInputNum);

    if (isNaN(userFactCalc)) {
        userFactCalc = "Please Enter A Number...";
    }
    let outputBox = document.getElementById("factorial");
    outputBox.value = userFactCalc;
});

// Prevent submit default action which refreshes page, annoyingly
factorialFormEl.addEventListener("submit", (evt) => evt.preventDefault());
/* CALCULATE FACTORIAL BUTTON END */
/* ------ FACTORIAL CALCULATION END ------ */