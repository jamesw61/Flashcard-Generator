'use strict';
var fs = require('fs');
var ClozeCard = function(text, cloze){
	this.fullText = text;
	this.cloze = cloze;
	this.partial = text.replace(cloze, '....');
}

// ClozeCard.prototype.partial = function() {
// 	return console.log(this.fullText.replace(this.cloze, '...'));
// };

ClozeCard.prototype.isCloze = function() {
	if(this.fullText.search(this.cloze) === -1){
		console.log('No Cloze!');
		return false;
	}
	return true;
};

ClozeCard.prototype.saveCardToFile = function() {
    fs.readFile('cloze.txt', "utf8", (err, data) => {
        if (err) throw err;
        var clozeArray = JSON.parse(data);
        clozeArray.push(this);
        fs.writeFile('cloze.txt', JSON.stringify(clozeArray), 'utf8', function(err) {
            if (err) throw err;
        });
    });
}

module.exports = ClozeCard


