const express = require('express');
const router = express.Router();
// const R = require('ramda');
// const taskEntity = require('../server/task/taskEntity');

// var resultToJson = R.curry((res, result)=>{
// 	res.json(result);
// });
const elasticsearch = require('../server/elasticsearch');
const srtParser = require('../server/srtParser');

var getUser = (req) => {
	return 'dong_yao@hotmail.com';
};

var displayWordsUncategorized = (user) => {
	return elasticsearch.findWordsHaveFamilarity(user)
		.then((result) => {
			return result.hits.hits.map( (obj) => obj._source.words);
		})
		.then((wordList) => {
			return elasticsearch.getWords(200).then((result) => {
				var tokens = result.aggregations.words.buckets.filter((item) => {
						return !wordList.includes(item.key);
					});
				return tokens;
			});
		});
};

//find the words not categorized
router.get('/words', (req, res, next) => {
	displayWordsUncategorized(getUser(req)).then( result => res.json(result) );
});

router.get('/wordsByFamilarity/:familarity', (req, res, next) => {
	var familarity = req.params.familarity;
	if (familarity == "undefined") {
		displayWordsUncategorized(getUser(req)).then( result => res.json(result) );
	} else {
		elasticsearch.findWordsByFamilarity(familarity, getUser(req))
			.then((result) => {
				return result.hits.hits.map( (obj) => obj._source.words);
			})
			.then((wordList) => {
				elasticsearch.getWords().then((result) => {
					var tokens = result.aggregations.words.buckets.filter((item) => {
							return wordList.includes(item.key);
						});
					res.json(tokens);
				});
			});
	}
});

router.post('/word', (req, res, next) => {
	// req.accepts('text/plain'); 
	var body = req.body;
	var sentenceArray = srtParser.getSentences(body.text)
							.map( (item) => {
								item.sourceTitle = body.sourceTitle;
								return item;
							});
	elasticsearch.bulkIndex(sentenceArray, 'myWords', 'words').then((result) => {
		res.json("command is sent");
	});
});

router.get('/word/:word', (req, res, next) => {
	var word = req.params.word;
	elasticsearch.getWord(word).then((result) => {
		res.json(result.hits.hits);
	});
});

router.put('/word/ignore/:word', (req, res, next) => {
	var word = req.params.word; 
	elasticsearch.ignoreWord(word, getUser(req)).then((result) => {
		res.json(result);
	});
});

router.put('/word/familarity/:word/:familarity', (req, res, next) => {
	var word = req.params.word; 
	var familarity = req.params.familarity;
	elasticsearch.setWordFamilarity(word, familarity, getUser(req)).then((result) => {
		res.json(result);
	});
});


module.exports = router;
