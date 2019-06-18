import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {

  /*API from opentdb to get 10 multiple choice questions in computer category*/
  apiUrl="https://opentdb.com/api.php?category=18&type=multiple";
  constructor(public http: HttpClient) {
    
  }
getQuestions()
{
  return this.http.get(this.apiUrl + "&amount=10");
}


}
