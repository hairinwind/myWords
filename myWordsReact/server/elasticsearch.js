var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200', 
	levels: ['error', 'warning']
});

var createDocument = (document) => {
	client.index({
		index: 'myWords',
		type: 'words',
		body: document
	}, function (error, response) {
		console.error(error);		
	});
};

var createBulkIndexBody = (documents, indexName, typeName) => {
	var action = { index:  { _index: indexName, _type: typeName} };
	var result = [];
	documents.forEach((document) => {
		result.push(action);
		result.push(document);
	}); 
	return result;	
};

exports.bulkIndex = (documents, indexName, typeName) => {
	var bodyParam = createBulkIndexBody(documents, indexName, typeName);
	return client.bulk({body: bodyParam});
}; 

exports.getWords = () => {
	return client.search({
		index: 'myWords',
		body: {
			"size": 0,
			"aggs": {
				"words" : {
					"terms": {
						"field": "english",
						"size": 300000
					}
				}
			}
		}
	});
};

exports.getIgnoreList = (user) => {
	return client.search({
		index: 'myWords',
		type: 'userFamilarity',
		body: {
			"size": 10000,
			"query":{
				"bool": {
					"must": [
						{"match": {"user": "dong_yao@hotmail.com"}}, 
						{"match": {"familarity": 3}} 
					] 
				}
			}
		}
	});
};

exports.getWord = (word) => {
	return client.search({
		index: 'myWords',
		type: 'words',
		body: {
			"size": 100,
			"query": {
			    "match": {
			      "english": word
			    }
			}
		}
	});
};

exports.ignoreWord = (word, user) => {
	return  client.search({ 
	           index: 'myWords',
	           type: 'userFamilarity',
	           body: { 
	              "query": {
	              	"bool": {
						"must": [
							{"match": {"user": user}}, 
							{"match": {"words": word}} 
						] 
					}
	              }
	           }
	        }).then((result) => {
	        	if (result.hits.total == 0) {
	        		return client.index({
  						index: 'myWords',
 						type: 'userFamilarity',
						body: {
							date: '2017-04-26',
							familarity: 3,
						    user: user,
						    words: word
						}
					});
				}	
	        });
};

exports.setWordFamilarity = (word, familarity, user) => {
	return  client.search({ 
	           index: 'myWords',
	           type: 'userFamilarity',
	           body: { 
	              "query": {
	              	"bool": {
						"must": [
							{"match": {"user": user}}, 
							{"match": {"words": word}} 
						] 
					}
	              }
	           }
	        }).then((result) => {
	        	if (result.hits.total == 0) {
	        		return client.index({
  						index: 'myWords',
 						type: 'userFamilarity',
						body: {
							date: '2017-04-26',
							familarity: familarity,
						    user: user,
						    words: word
						}
					});
				} else {
					var id = result.hits.hits[0]._id;
					return client.index({
  						index: 'myWords',
 						type: 'userFamilarity',
 						id: id,
						body: {
							date: '2017-04-26',
							familarity: familarity,
						    user: user,
						    words: word
						}
					});
				}	
	        });
};