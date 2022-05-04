import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
   qid = '' ;
   qTitle = '';
   questions = [
     {
       answer:'',
     content:'',
     option1:'',
     option2:'',
     option3:'',
     option4:'',

     }
   ];
  constructor(private _route:ActivatedRoute,
    private _question:QuestionsService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title']
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data:any) => {
        this.questions = data;
        console.log(this._question)
      },(error) =>{
        console.log(error);
      }
    )
  }

}
