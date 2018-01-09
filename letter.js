/*
    When a new instance of the Letter constructor is created
    it will use the index (that passed to it) 
    and an array (that will be the array of letters that make up the word to be guesse)
    created by the Word constructor
*/

class Letter {
    
    constructor (word_arr, index) {
        this.value = word_arr[index];   
        this.hidden = "_";
        this.guessed = false;
    }

}

module.exports = Letter;