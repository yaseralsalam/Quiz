import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questionsData:any;
  questionCount:number = 10;
  questionIndex=0;
  rgValue;
  choices=[];
  constructor(public navCtrl: NavController, private questionProvider:QuestionProvider, private toastCtrl:ToastController) {
this.loadQuestions();
  }

  loadQuestions()
  {
    this.questionProvider.getQuestions().subscribe(
      data=>{
        
      this.questionsData = data;
      console.log(this.questionsData);
      console.log(this.questionsData.results[0].question);
      this.questionsData.results[0].question = this.replaceChar(this.questionsData.results[0].question);
      console.log("question replaced");
      this.getChoices();
      console.log(Math.floor(Math.random()*4)+1);
      console.log(this.questionsData.results.length);
      if(this.questionsData.results.length==0)
      {
        
        let toast = this.toastCtrl.create(
          {
            message: "No data have been found.",
            duration: 3000,
            position: "middle"
          }
        );
        toast.present();
        toast.onDidDismiss(()=>
        {}
        );
      }

    },
    (err)=>{
      let toast = this.toastCtrl.create(
        {
          message: "An error occurred while loading data. Please check your connection.",
          duration: 3000,
          position: "middle"
        }
      );
      toast.present();
      toast.onDidDismiss(()=>
      {}
      );
    });
  }

  replaceChar(str:string)
  {
    while(str.indexOf("&#039;")!=-1)
     str = str.replace("&#039;","'");
    while(str.indexOf("&quot;")!=-1) 
     str = str.replace("&quot;","\"");
    
   return str;
  }

  getChoices()
{
  for(let i =0;i<3;i++)
  {
    this.questionsData.results[this.questionIndex].incorrect_answers[i] = this.replaceChar(this.questionsData.results[this.questionIndex].incorrect_answers[i]);
    this.choices[i] = this.questionsData.results[this.questionIndex].incorrect_answers[i]
    
   }
  this.questionsData.results[this.questionIndex].correct_answer= this.replaceChar(this.questionsData.results[this.questionIndex].correct_answer);
  this.choices[3] = this.questionsData.results[this.questionIndex].correct_answer;
  console.log(this.choices);
  
}
}
