import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router:Router,
    private _activatedRoute: ActivatedRoute,
    private _quiz :QuizService,
    private _cat:CategoryService,
    private _snack:MatSnackBar,
     ) { }
  qid = 0;

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
  categories = [
    {
      cid:'',
      title:''
    }
  ];

  ngOnInit(): void {  
    this.qid = this._activatedRoute.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any) => {
        this.quiz = data;
        console.log(this.quiz)
      },(error) =>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe( 
      (data:any) => {
          this.categories = data;
      },(err) => {
        alert('error in loading categories');
      }
    )
  }

  public updateData(){
    if(this.quiz.title.trim() == '' || this.quiz.title == null){
      this._snack.open("Title Required !!","",{
        duration:3000
      })
      return;
    }
    if(this.quiz.maxMarks == '' || this.quiz.maxMarks == null){
      this._snack.open("Maximum Marks Required !!","",{
        duration:3000
      })
      return;
    }
     if(this.quiz.numberOfQuestions == '' || this.quiz.numberOfQuestions == null){
      this._snack.open("Number Of Question Required !!","",{
        duration:3000
      })
      return;
    }

     if(this.quiz.category.cid == '' || this.quiz.category.cid == null){
      this._snack.open("Category have selected !!","",{
        duration:3000
      })
      return;
    }
    
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
          Swal.fire('Success !!','quiz updated','success').then((e)=>{
            this._router.navigate(['admin/quizzes']);
          });
      },(err) => {
        Swal.fire('Error','error in updating quiz','error');
      }
    )
   
  }

}
