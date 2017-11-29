const express = require('express');
const router = express.Router();
// const R = require('ramda');
// const taskEntity = require('../server/task/taskEntity');

// var resultToJson = R.curry((res, result)=>{
// 	res.json(result);
// });
const elasticsearch = require('../server/elasticsearch');
const srtParser = require('../server/srtParser');

router.get('/words', (req, res, next) => {
	elasticsearch.getIgnoreList('dong_yao@hotmail.com')
		.then((result) => {
			return result.hits.hits.map( (obj) => obj._source.words);
		})
		.then((ignoreList) => {
			elasticsearch.getWords().then((result) => {
				var tokens = result.aggregations.words.buckets.filter((item) => {
						return !ignoreList.includes(item.key);
					});
				res.json(tokens);
			});
		});
});

router.post('/word', (req, res, next) => {
	req.accepts('text/plain'); 
	var text = req.body;
	var sentenceArray = srtParser.getSentences(text);
	console.log("total records: ", sentenceArray.length);
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
	elasticsearch.ignoreWord(word, 'dong_yao@hotmail.com').then((result) => {
		res.json(result);
	});
});

router.put('/word/familarity/:word/:familarity', (req, res, next) => {
	var word = req.params.word; 
	var familarity = req.params.familarity;
	elasticsearch.setWordFamilarity(word, familarity, 'dong_yao@hotmail.com').then((result) => {
		res.json(result);
	});
});


module.exports = router;
