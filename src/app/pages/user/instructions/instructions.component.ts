import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid = null;
  time=1;
  marks=1;
  quiz = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  };
  constructor(
    private _quiz:QuizService,
    private _rout:Router,
    private _route:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any) => {
        this.quiz = data
        this.time = data.numberOfQuestions;
        this.marks = data.maxMarks;
      },(error) => {
        alert("Error in loading quiz data")
      }
    )
  }

  public startQuiz(){
    Swal.fire({
      title:'Do you want to start the quiz',
      showCancelButton:true,
      confirmButtonText:'Start',
      denyButtonText:'Cancel',
      icon:'info'
    }).then((result) => {
      if(result.isConfirmed){
        this._rout.navigate(['/start/' + this.qid])
      }else if(result.isDenied){
        
      }
    })
  }

}
