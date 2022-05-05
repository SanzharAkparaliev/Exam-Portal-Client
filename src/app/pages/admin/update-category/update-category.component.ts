import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  cId = 0
  category = {
    cid:'',
    title:'',
    description:''
  }

  constructor(private _category:CategoryService,
    private _router:ActivatedRoute,
    private _snack:MatSnackBar,
    private rout:Router
    ) { }

  ngOnInit(): void {
    this.cId = this._router.snapshot.params['cid'];
    this._category.getCategory(this.cId).subscribe(
      (data:any) => {
        this.category = data;
        console.log(this.category)
      },(error) =>{
        console.log(error);
      }
    );
  }
  public updateCategory(){
    if(this.category.title.trim()=='' || this.category.title == null){
      this._snack.open('Title Required !!' ,'', {
        duration:3000
      });
      return;
     }

  this._category.updateCategory(this.category).subscribe((data:any) => {
    this.category.title = '';
    this.category.description = '';
    Swal.fire('Success !!','Category is updated successfully','success');
    this.rout.navigate(['admin/categories']);
  },
  (error) => {
    console.log(error);
    Swal.fire('Error !!','Server error !!','error');
  }
  )
}
}


