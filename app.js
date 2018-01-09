const inquirer = require('inquirer');


// animals.js file with lots of animals in an array
// Word constructor 
    // properties: word (from the animals.js), word as an array, length, guesses remaining (10)
// Letter constructor 
    // properties: 
        // value (actual letter, required from the word_arr in Word constructor), 
        // hidden: _
        // guessed (boolean)
// Create 1 array (display_arr), each entry is a letter generated with the Letter constructor
    // Create an instance of Word constructor
    // In a loop: create as many instances of the Letter constructor as there are letters in the word
        // Push each instance into the display_arr

// ask()
    // Display the array of dashes
    // Get letter typed from user
    // If letter typed == a letter in the word array 
        // Replace the _ at that index with the letter typed
            // HOW? if guessed ? Letter.value : Letter.hidden 
        // If array of dashes != than the array for the word
            // Ask again
        // Else (dashes_arr = word_arr)
            // Game over! user won
    // Else (letter typed is not in the array)
        // guess remainings--
        // If guess remainings < 1
            // Game over! User lose
        // Else (guess remainings >= 1)
            // ask() 
