import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

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
     quesId:'',
     answer:'',
     content:'',
     option1:'',
     option2:'',
     option3:'',
     option4:'',

     }
   ];
  constructor(private _route:ActivatedRoute,
    private _question:QuestionsService,
    private _snack:MatSnackBar
    ) { }

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

  public deleteQuestion(quesId:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure, want to delete this question?',
    }).then((result) => {
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe((data) => {
          this._snack.open('Question Deleted','',{
            duration:3000
          });
          this.questions = this.questions.filter((q) => q.quesId != quesId)
        },(error) =>{
          this._snack.open('Error in deleting questions','',{
            duration:3000 
          })
        })
      }
    })
  }

}
