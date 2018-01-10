const inquirer = require('inquirer');
const Word = require('./word.js'); // Require Word constructor 
const Letter = require('./letter.js');  // Require Letter constructor

// This is the magic!!!!
// An array of instances of the Letter constructor

let arr_Letters = [];   // Holds each instance of Letter, the value propertie of each instance is the letter to be guessed
let display_arr = [];   // The array that gets updated... "guessed"? value : "_" 

const word = new Word; // Get a word to play

// Create as many instances of the Letter constructor as there are letters in the word
const gen_display_arr = () => {
    display_arr = []; // Empty the array
    
    for(let i = 0; i < word.word_length; i++) {
        let each_letter = new Letter(word.word_arr, i); // Pass the array that holds each letter of the word, and the index
        
        arr_Letters.push(each_letter);  // Create the array of instances with all properties available

        if (arr_Letters[i].guessed) {   // If the letter's guessed property value = true
            display_arr.push(each_letter.value);
        }
        else {
            display_arr.push(each_letter.hidden);  // Push each instance of Letter into an array
        }
    }
}


// Debugging
//console.log(display_arr);

const play_now = () => {
    gen_display_arr();  // Generate an array with the corresponding dashes/letters
    
    console.log(`The Word is: ${word.word}`); // Debugging: Word to be guessed

    if (word.guess > 0) { // User still has guesses remaining

        for (let i = 0; i < word.word_length; i++) {   // Display _ in the command prompt
            process.stdout.write(`${display_arr[i]} `); // Console.log creates a new line automatically, process.stdout.write doesn't
        }
        console.log("\n"); // Create new line

        inquirer.prompt([
            {
                name: "user_guess",
                message: "Guess a letter",
            }
        ]).then(answer => {
            // User guessed wrong: letter typed NOT in the array
            if (word.word_arr.indexOf(answer.user_guess) < 0 ) {
                console.log("Wrong\n");   // Alert the user
                word.guess--;   // Decrease guesses
                console.log(`Guesses reamining: ${word.guess}\n`);
                
                if (word.guess < 1) {   // User runs out of tries
                    console.log("Game Over, you lose!");
                } 
                else{   
                    play_now();
                }
            } 
            //  User guessed right: letter typed IS in the array
            else {
                console.log("Right");   // Alert the user

                for ( let i = 0; i < word.word_length; i++) {   // Look for the typed word in the array of Letter instances and change the property value
                    if (word.word_arr[i] == answer.user_guess) {
                        arr_Letters[i].guessed = true;
                    }
                }
                
                play_now(); // Play again
            }

        });
    };
        
}

play_now();


// * = DONE
// *Word constructor 
    // *properties: word (from the animals.js), word as an array, length, guesses remaining (10)
// *Letter constructor 
    // properties: 
        // *value (actual letter, required from the word_arr in Word constructor), 
        // *hidden: _
        // *guessed (boolean)
// *Create 1 array (display_arr), each entry is a letter generated with the Letter constructor
    // *Create an instance of Word constructor
    // *In a loop: create as many instances of the Letter constructor as there are letters in the word
        // *Push each instance into the display_arr

// ask()
    //* Display the array of dashes
    //* Get letter typed from user
    // If letter typed == a letter in the word array 
        // Replace the _ at that index with the letter typed
            // HOW? if guessed ? Letter.value : Letter.hidden 
        // If array of dashes != than the array for the word
            // Ask again
        // Else (dashes_arr = word_arr)
            // Game over! user won
    //* Else (letter typed is not in the array)
        //* guess remainings--
        //* If guess remainings < 1
            //* Game over! User lose
        //* Else (guess remainings >= 1)
            //* ask() 
