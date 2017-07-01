'use strict';

var fs = require('fs');
var promptly = require('promptly');
var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var count = 0;

// var firstPresident = new BasicCard(
//     "Who was the first president of the United States?", "George Washington");

// var secondPresident = new BasicCard(
//     "Who was the 2nd president?", "John Adams");

// var firstPresidentCloze = new ClozeCard(
//     "George Washington was the first president of the United States.", "George Washington");


function start() {
    promptly.choose('"u"se Flashcards, "c"reate Flashcards, or "q"uit?', ['u', 'c', 'q'], function(err, value) {
        switch (value) {
            case 'u':
                useCards();
                break;
            case 'c':
                createCard();
                break;
            case 'q':
                break;
        }
    });
}

function createCard() {
    promptly.choose('"b"asic or clo"z"e-deleted', ['b', 'z'], function(err, value) {
        switch (value) {
            case 'b':
                createBasic();
                break;
            case 'z':
                createCloze();
                break;
        }
    });
}

function createCloze() {
    console.log('-----\n-----');
    promptly.prompt('Enter the full text that goes on the back of the card:')
        .then(function(value) {
            console.log('-----\n-----');
            var clozeBack = value;
            promptly.prompt('What text is cloze deleted?')
                .then(function(value) {
                    var clozeFront = value;
                    var newClozeCard = new ClozeCard(clozeBack, clozeFront);
                    if (newClozeCard.isCloze() == false) {
                    	console.log('-----\n-----');
                        console.log("Cloze deleted text must be present in full text, Try again");
                        createCloze();
                        return;
                    }
                    newClozeCard.saveCardToFile();
                    start();
                });
        });
}

function createBasic() {
    console.log('-----\n-----');
    promptly.prompt('What do you want on the front of the flashcard?')
        .then(function(value) {
            var newFront = value;
            promptly.prompt('What do you want on the back of the flashcard?')
                .then(function(value) {
                    var newBack = value;
                    var newBasicCard = new BasicCard(newFront, newBack);
                    newBasicCard.saveCardToFile();
                    start();
                });
        });
}

function useCards() {
    console.log('-----\n-----');
    promptly.choose('"b"asic or clo"z"e-deleted', ['b', 'z'], function(err, value) {
        console.log('-----\n-----');
        switch (value) {
            case 'b':
                count = 0;
                useBasic();
                break;
            case 'z':
                count = 0;
                useCloze();
                break;
        }
    });

}

function useBasic() {
    fs.readFile('basic.txt', (err, data) => {
        if (err) throw err;
        var basicArray = JSON.parse(data);
        if (count < basicArray.length) {
            console.log('-----\n-----');
            console.log(basicArray[count].front);
            console.log('-----');
            promptly.choose('Press "y" to see the answer', ['y'], function(err, value) {
                if (err) throw err;
                var val = value;
                console.log('-----');
                console.log("The answer is: " + basicArray[count].back);
                console.log('-----\n-----');
                count++;
                useBasic();
            });
        }
    });
}

function useCloze() {
    fs.readFile('cloze.txt', (err, data) => {
        if (err) throw err;
        var clozeArray = JSON.parse(data);
        if (count < clozeArray.length) {
            console.log('-----\n-----');
            console.log("            " + clozeArray[count].partial);
            console.log('-----');
            promptly.choose('Press "y" to see the full text', ['y'], function(err, value) {
                if (err) throw err;
                var val = value;
                console.log('-----');
                console.log("The full text is:\n\n" + clozeArray[count].fullText);
                console.log('-----\n-----');
                count++;
                useCloze();
            });
        }
    });
}


start();


