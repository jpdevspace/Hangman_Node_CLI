const inquirer = require('inquirer');
const chalk = require('chalk');
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
    let did_I_just_win = false;

    if (display_arr.join() == word.word_arr.join()) {
        did_I_just_win = true;
    }
    console.log(`\nThe Word is: ${word.word}`); // Debugging: Word to be guessed


    if (word.guess > 0 && !did_I_just_win) { // User still has guesses remaining

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
                console.log("\n" + chalk.red("Wrong\n"));   // Alert the user
                word.guess--;   // Decrease guesses
                console.log(chalk.bgBlue(`Guesses reamining: ${word.guess}`));
                console.log("\n"); // Extra space
                
                play_now();           
            } 
            //  User guessed right: letter typed IS in the array
            else {
                console.log("\n" + chalk.green("Right"));   // Alert the user

                for (let i = 0; i < word.word_length; i++) {   // Look for the typed word in the array of Letter instances and change the property value
                    if (word.word_arr[i] == answer.user_guess) {
                        arr_Letters[i].guessed = true;
                    }
                }

                play_now(); // Play again
            }

        });
    }
    else if(word.guess > 0 && did_I_just_win){
        console.log("\n" + chalk.bgYellow("Congratulations: You Won!"));
    }
    else {
        console.log("\n" + chalk.bgRed("Game Over: You Lose!"));
    }
        
}

play_now();
