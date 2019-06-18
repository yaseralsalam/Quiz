import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  questionCount;
  correctAnswers;
  wrongAnswers;
  grade;
  percent;
  color = "secondary";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.questionCount = navParams.get("questionCount");
    this.correctAnswers = navParams.get("correctAnswers");
    this.wrongAnswers = navParams.get("wrongAnswers");
    this.getPercent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  getPercent()
  {
    this.percent = (this.correctAnswers/this.questionCount)*100;
    this.percent = this.percent.toFixed();
    this.color="secondary";
    if(this.percent>=90)
      this.grade="Excellent!";
    else if(this.percent>=80)
      this.grade ="Very Good!";
    else if(this.percent>=50)
      this.grade = "Good!";
    else 
    {
      this.grade = "Try Again!"
      this.color = "danger";
    }
  }

  onClick()
  {
    this.navCtrl.push(HomePage);
  }

}
