const animals = require('./animals.js');    // Array with all the options to guess

class Word { // Word constructor 
    
     constructor () {
         this.word = animals[Math.floor((Math.random() * animals.length))]; // Get a random word from the animals array 
         this.word_arr = this.word.split('');   // Converts the word string into an array
         this.word_length = this.word.length;   // Length of the word
         this.guess = 10;   // How many guesses
     }     
    
}

module.exports = Word;
