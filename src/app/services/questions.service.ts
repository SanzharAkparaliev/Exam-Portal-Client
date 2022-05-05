import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
}
