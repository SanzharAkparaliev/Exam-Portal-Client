import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
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
  constructor(private _router:ActivatedRoute) { }

  ngOnInit(): void {
    this.qid = this._router.snapshot.params['qid'];
    this.qTitle = this._router.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;
  }

}
