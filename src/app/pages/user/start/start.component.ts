import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid=null;
  qTitle = '';
  questions = [
    {
    quesId:'',
    answer:'',
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',

    }
  ];
  constructor(
private locationSt:LocationStrategy,
private _route:ActivatedRoute,
private _question:QuestionsService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid']
    this.loadQuestions();
  }

  loadQuestions(){
    this._question
      .getQuestionsOfQuizForTest(this.qid).subscribe(
        (data:any)=> {  
          this.questions = data;
          this.qTitle = data[0].quiz.title;
        },(error)=>{
          Swal.fire("Error","Error in loading quistions of quiz")
        }
      ) 
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null,'',location.href)
    })
  }

}
