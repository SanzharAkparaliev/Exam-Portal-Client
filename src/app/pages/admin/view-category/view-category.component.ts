import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  categories = [
    {
      cid: null,
      title: null,
      description: null
    }
  ]

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any) =>{
      this.categories = data;
      console.log(data);
    },(err) => {
      console.log(err);
      Swal.fire("Error !!","Error in loading data","error");
    })
  }

  deleteCategory(cid:any){
    Swal.fire({
      icon:"info",
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result:any) => {
      if(result.isConfirmed){
        this._category.deleteCategory(cid).subscribe(
          (data) => {
            this.categories = this.categories.filter((category:any) => category.cid != cid);
            Swal.fire('Success','Category deleted ', 'success');
          },
          (error) =>{
            Swal.fire('Error','Error in deleting category','error');
            console.log(error)
          }
        )
      }
    })
  }

}
