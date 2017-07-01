'use strict';
var fs = require('fs');
var BasicCard = function(front, back) {
    if (this instanceof BasicCard) {
        this.front = front;
        this.back = back;
    }
    else {
    	return new BasicCard(front, back);
    }
}

BasicCard.prototype.saveCardToFile = function() {
    fs.readFile('basic.txt', "utf8", (err, data) => {
        if (err) throw err;
        var basicArray = JSON.parse(data);
        basicArray.push(this);
        fs.writeFile('basic.txt', JSON.stringify(basicArray), 'utf8', function(err) {
            if (err) throw err;
        });
    });
}

module.exports = BasicCard;
