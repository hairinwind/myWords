import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordsService {

	constructor(private http: Http) { }

	getAllWords() {
		return this.http.get('/api/words')
			.map(res => res.json());  //return observable
	}

	getSentences(word) {
		return this.http.get('/api/word/'+word)
			.map(res => res.json());
	}

	ignore(word) {
		return this.http.put('/api/word/ignore/'+word, '', {})
			.map(res => res.json());
	}

	setWordFamilarity(word, familarity) {
		return this.http.put('/api/word/familarity/'+word+'/'+familarity, '', {})
			.map(res => res.json());
	}

}
