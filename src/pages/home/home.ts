import { ResultPage } from './../result/result';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question/question';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questionsData:any; //holds data from provider
  questionCount:number = 10;
  questionIndex=0;
  correctAnswers:number = 0; //counter of correct answers
  wrongAnswers:number = 0; //counter of wrong answers
  message;
  rgValue; // answer chosen by the user
  choices=[]; //answer's choices
  duration = 1000;

  constructor(public navCtrl: NavController, private questionProvider:QuestionProvider, private toastCtrl:ToastController, private loadingCtrl:LoadingController) {
this.loadQuestions();
  }

  //this function loads data from the provider and it executes only one time at constructor
  loadQuestions()
  {
    this.questionProvider.getQuestions().subscribe(
      data=>{
        
      this.questionsData = data;
      
      //prepare the first question
      this.questionsData.results[0].question = this.replaceChar(this.questionsData.results[0].question);
     
      this.getChoices();
     
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

  //this function replaces special characters
  replaceChar(str:string)
  {
    while(str.indexOf("&#039;")!=-1)
     str = str.replace("&#039;","'");
    while(str.indexOf("&quot;")!=-1) 
     str = str.replace("&quot;","\"");
    
   return str;
  }

//this function prepares the choices for the question and randomize it 
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
  this.choices = this.shuffle(this.choices);

  }

  //this function randomize the array of answers
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  /*this function does the following:
  1. checks the answer if it is correct or not
  2. counts the number of correct/wrong answers
  3. shows the appropriate message
  4. transfer to the result page if the quiz completed
  */
  async onClick()
  {
    this.duration=1000;
    console.log("rgValue="+this.rgValue);

    
   
    console.log(this.questionIndex);
    
    if(this.rgValue != null)
    {
    if(this.questionsData.results[this.questionIndex].correct_answer == this.rgValue)
     { 
       this.correctAnswers++;
       this.message="Correct Answer!";
     }
    else
    {
      this.wrongAnswers++;
      this.message="Wrong Answer!<br>Correct Answer is: "+this.questionsData.results[this.questionIndex].correct_answer;
      this.duration=2500;
    }

  }
  else
  {
    this.message="Please choose an answer!";
  }
    let loading = await this.loadingCtrl.create({
      spinner: 'hide',
      content: this.message
    });
  
    loading.present();
    await loading.onDidDismiss(data => {
     
      if(this.rgValue!=null)
      {
        this.rgValue=null;
        if(this.questionIndex+1 <= this.questionCount-1)
        {
          this.questionIndex++;
          this.questionsData.results[this.questionIndex].question = this.replaceChar(this.questionsData.results[this.questionIndex].question);
          this.getChoices();
        }
        
        
        else
        {
          this.navCtrl.push(ResultPage, {"questionCount": this.questionCount, "correctAnswers":this.correctAnswers, "wrongAnswers":this.wrongAnswers});
        }
      }
      
    });
    setTimeout(() => {
      loading.dismiss();
    }, this.duration);


  }

}
