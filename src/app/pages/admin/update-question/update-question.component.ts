import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qid = '';
  qTitle= ''
  question = {
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };

  constructor(private _activeRoute:ActivatedRoute,
    private _question:QuestionsService,
    private _snack:MatSnackBar,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.qid = this._activeRoute.snapshot.params['qid'];
    this.qTitle = this._activeRoute.snapshot.params['title']
    this._question.getQuestion(this.qid).subscribe(
      (data:any) => {
        this.question = data;
        console.log(this.question)
      },(error) =>{
        console.log(error);
      }
    );
  }

  public updateQuestion(){
    if(this.question.content.trim() == '' || this.question.content == null){
      return;
    }
    if(this.question.option1.trim() =='' || this.question.option1 == null){
      return ;
    }

    if(this.question.option2.trim() =='' || this.question.option2 == null){
      return ;
    }

    if(this.question.answer.trim() == '' || this.question.answer == null){
      this._snack.open("Answer have selected !!","",{
        duration:3000
      })
      return ;
    }


    this._question.updateQuestion(this.question).subscribe((data:any) => {
      Swal.fire('Success','Question Updated ','success');
      this._router.navigate(['admin/quizzes'])

      },(err) => {
        Swal.fire('Error','Error in adding question','error');
      }
    )
  }

}
