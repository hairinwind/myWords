import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';

@Component({
	selector: 'app-words',
	templateUrl: './words.component.html',
	styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {
	wordsCount: any = [];	

	constructor(private wordsService : WordsService) { }

	ngOnInit() {
		var start = Date.now();
		this.wordsService.getAllWords().subscribe(wordsCount => {
			this.wordsCount = wordsCount;
			console.log(Date.now() - start);
		});
	}

	getSentences(word, index) {
		this.wordsService.getSentences(word).subscribe(sentences => {
			this.wordsCount[index].sentences = sentences.map(sentenceResult => {
				return sentenceResult._source;
			});
		})
	}

	addToIgnoreList(word, index) {
		var wordsCount = this.wordsCount;
		this.wordsService.ignore(word).subscribe(result => {
			wordsCount.splice(index, 1);
		});
	}

	red(word, index) {
		this.wordsService.setWordFamilarity(word, 2).subscribe( result => {});
	}

	yellow(word, index) {
		this.wordsService.setWordFamilarity(word, 1).subscribe( result => {});
	}

	green(word, index) {
		this.wordsService.setWordFamilarity(word, 0).subscribe( result => {});
	}

}
