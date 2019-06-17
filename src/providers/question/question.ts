import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {
  apiUrl="https://opentdb.com/api.php?category=18&type=multiple";
  constructor(public http: HttpClient) {
    //console.log('Hello QuestionProvider Provider');
  }
getQuestions()
{
  return this.http.get(this.apiUrl + "&amount=10");
}


}
