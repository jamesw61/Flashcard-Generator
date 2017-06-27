'use strict';
var ClozeCard = function(text, cloze){
	// if(text.search(cloze) === -1) {
	// 	console.log('No Cloze!');
	// 	return;
	// }
	this.fullText = text;
	this.cloze = cloze;
	// this.partial = text.replace(cloze, "...");	
}

ClozeCard.prototype.partial = function() {
	return console.log(this.fullText.replace(this.cloze, '...'));
};

ClozeCard.prototype.isCloze = function() {
	if(this.fullText.search(this.cloze) === -1){
		console.log('No Cloze!');
		return;
	}
};



module.exports = ClozeCard;