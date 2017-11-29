import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WordsComponent } from './words/words.component';
import { WordsService } from './words.service';
import { AddWordsComponent } from './add-words/add-words.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'viewWords',
    pathMatch: 'full'
  },
  {
    path: 'viewWords',
    component: WordsComponent
  },
  {
    path: 'addWords',
    component: AddWordsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WordsComponent,
    AddWordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [WordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
