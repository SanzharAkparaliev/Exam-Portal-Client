import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId = null;
  quizzes = [
    {
      qid:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'',
      category:{
        title:''
      }  
    }
  ]
  constructor(private _route:ActivatedRoute,
              private _quiz:QuizService
    ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) =>{
      console.log(params);
      this.catId = params['catId'];


    if(this.catId == 0){
      this._quiz.quizzes().subscribe(
        (data:any) =>{
          this.quizzes = data;
          console.log(this.quizzes)
        },(error) => {
          alert("Error in loading all quizzes")
        }
      )
    }else{
      this._quiz.getQuizOfCategory(this.catId).subscribe(
        (data:any) => {
          this.quizzes = data
        },(error) => {
          alert("error in loading quiz")
        }
      )
    }
    })


  }

}
