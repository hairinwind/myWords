const R = require('ramda');

var splitSrtTextByEmptyLine = (text) => {
	var array = text.replace(/\r\n/g, "\n")
					.replace(/\r/g, "\n")
					.split(/\n{2,}/g);
	return array;
};

var splitSentenceByLine = (sentence) => {
	return sentence.split(/\n/g);
}; 

var filterSentence = (sentenceArray) => {
	return sentenceArray.length == 4
		&& R.any(isChinese)(sentenceArray[2].split(''))
		&& R.none(isChinese)(sentenceArray[3].split(''));
};

var convertToObj = (setenceArray) => {
	return {
		"english": setenceArray[3],
		"chinese": setenceArray[2],
	}; 
};

var isChinese = (c) => {
	return c.match(/[\u3400-\u9FBF]/);
};

exports.getSentences = (srtText) => {
	return splitSrtTextByEmptyLine(srtText)
				.map(splitSentenceByLine)
				.filter(filterSentence)
				.map(convertToObj);
};