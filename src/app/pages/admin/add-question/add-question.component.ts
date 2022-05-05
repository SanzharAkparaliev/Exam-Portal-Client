import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
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
  constructor(private _router:Router,
    private _activeRouter:ActivatedRoute,
    private _quiz:QuizService,
    private _question:QuestionsService,
    private _snack:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.qid = this._activeRouter.snapshot.params['qid'];
    this.qTitle = this._activeRouter.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;
  }

  formSubmit(){
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

    this._question.addQuestion(this.question).subscribe(
      (data:any) => {
          Swal.fire('Success','Question Added. Add Another one ','success');
          this.question = {
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
      },(err) => {
        Swal.fire('Error','Error in adding question','error');
      }
    )
  }

}
