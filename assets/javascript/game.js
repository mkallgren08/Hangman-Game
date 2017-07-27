// Selection of animals for the game
compOptions = ["mantis-shrimp", "echidna", "platypus", "hagfish"]

// Selection of valid characters for the game
var characSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
				'l', 'm' ,'n' ,'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
				'w', 'x' ,'y' ,'z', "-" ]

// String version of compOption selection
var computerPick

// Array of options already picked (initially blank)
var alreadyPicked = [];

//Globally declares a variable to display the answer in "_ _ _ _" and completed (i.e. "bear") form
var currentlyPicked

// Array form of the picked animal from compOptions
var pickedArray = [];

// Win/loss/lives variables
var win = 0
var loss = 0
var lives = 13

// This is the array of user entries
var userGuesses = [];
var userGuess;


// This causes the computer to run 
pickAnimal = function(){
		// Selects a random index number to pull a word out of compOptions
		computerPick = compOptions[Math.floor(Math.random() * compOptions.length)].toString();
			console.log(computerPick);
			// document.getElementById("currentPick").innerHTML = computerPick;

		// Creates an array of indeces already picked from the computerPick option
			alreadyPicked.push(computerPick);
			console.log("Already picked: "+ alreadyPicked);

		// This constructs an array out of the chracters in computerPick
			for ( var i = 0; i < computerPick.length; i++){
				var l = computerPick.charAt(i);
				pickedArray.push(l);
			}
		// var pickedArray = computerPick.toCharArray();
		// 	console.log(pickedArray);

		currentlyPicked = pickedArray.fill("^")
			document.getElementById("currentPick").innerHTML = currentlyPicked.join(" ");
};



pickAnimal();


// This function is run whenever the user presses a key and needs to contain all the code I wish to run.
document.onkeyup = function(event) {

		function gameWinner(){
			console.log("You win!")
			win++;
			document.getElementById("winCount").innerHTML = win;
		}

		function gameLoser(){
			loss++;
			document.getElementById("lossCount").innerHTML = loss;
		}

		function loseLife(){
			lives--;
			document.getElementById("livesLeft").innerHTML = lives;
		}

		// function getAllIndexes(arr, val){
		// 	for (j = 0; j < arr.length; j++)
		// 		if (arr[j] === val)
		// 			switchIndex.push(j)
		// 	return switchIndex;
		// }

		function correctGuess(){
			var switchIndex = computerPick.indexOf(userGuess);
			
				// console.log(switchIndex);
				currentlyPicked[switchIndex] = userGuess;
				document.getElementById("currentPick").innerHTML = currentlyPicked.join(" ");	
		}	

		function gameReset(){
			currentlyPicked = [];
			pickAnimal();
		}


		//function solvedCheck(){
			//return currentlyPicked.indexOf("_")
		//}

		// Determines which key was pressed and inputs it as var userGuess:
	    userGuess = event.key.toLowerCase(); 

	    // This builds the array of userGuesses

	    // First option: is the character valid (in characSet)?
	    if (characSet.indexOf(userGuess) === -1){
	    	console.log("Invalid character entry!")

		    // Second option: has the user already selected this character?
		    } else if (userGuesses.indexOf(userGuess) >= 0){
		    	console.log("Repeated entry, entry ignored");
		    	// This was the only way I could keep lives from going down on a repeated
		    	// keystroke :/
		    	lives++;
		    // Final option: character is valid a
		    } else {
		    	userGuesses.push(userGuess);
		    }
	    //This prints the userGuesses as a string concatenated with a space in between characters
		document.getElementById("guesssoFar").innerHTML = userGuesses.join(" ")

		//Here are the nested elifs that spell the word out on the screen

		// First check: are there any "_"'s left in the currentlyPicked array? If no, it should
		//mean the word has been spelled out completely and the user has won.
		if (currentlyPicked.indexOf("^") === -1){ 
			gameWinner();
			gameReset();
		}
			// Second check: If lives = 0, the game resets with a new word.
	    	else if (lives === 0){
				gameLoser();
				gameReset();
			}

			// Third check: does userGuess not appear in computerPick?
	    	else if (computerPick.indexOf(userGuess) === -1 && userGuess !== "-"){
				loseLife();
			}	

			else if (computerPick.indexOf(userGuess) >= 0){
				correctGuess();
			}
};
