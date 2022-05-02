import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userSerice:UserService,private snack:MatSnackBar,private router:Router) { }

  public user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username==null || this.user.username==''){
    //  alert('User is required');
      this.snack.open("Username is required !!","",{
          duration:3000
      })
    return;
    }

    //assUser:userservice

    this.userSerice.addUser({ user: this.user }).subscribe(
      (data:any)=>{
        console.log(data);
        //alert('sucess');
        Swal.fire('Successfully done !!','user id is '+ data.id ,'success')
        this.router.navigate(['login'])
      },
      (error) => {
        console.log(error);
        //alert('someting went wrong');
        this.snack.open('something went wrong !!','',{
          duration:3000
        })
      }
    )
  }

}
