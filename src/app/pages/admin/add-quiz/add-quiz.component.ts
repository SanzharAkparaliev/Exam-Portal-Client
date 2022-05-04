import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories = [
    {
      cid:'',
      title:''
    }
  ];

  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  };

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any) => {
      this.categories = data;
      //  console.log(this.categories);
    },(err) => {
      console.log(err);
      Swal.fire("Error!!","Error in loading data from server","error");
    })
  }

  public addQuiz(){
    if(this.quizData.title.trim() == '' || this.quizData.title == null){
      this._snack.open("Title Required !!","",{
        duration:3000
      })
      return;
    }
    if(this.quizData.maxMarks.trim() == '' || this.quizData.maxMarks == null){
      this._snack.open("Maximum Marks Required !!","",{
        duration:3000
      })
      return;
    }
     if(this.quizData.numberOfQuestions.trim() == '' || this.quizData.numberOfQuestions == null){
      this._snack.open("Number Of Question Required !!","",{
        duration:3000
      })
      return;
    }

     if(this.quizData.category.cid == '' || this.quizData.category.cid == null){
      this._snack.open("Category have selected !!","",{
        duration:3000
      })
    }

    this._quiz.addQuiz(this.quizData).subscribe((data) => {
      Swal.fire('Success',"Quiz is added",'success');

      this.quizData = {
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid:''
        }
      };

    },(error) => {
      Swal.fire('Error!!','Error while adding quiz','error');
      console.log(error);
    })
  }
}
