import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiManager } from '../services/api';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  Loginstatus:boolean = false;

  constructor(private toastr:ToastrService,private loginService: LoginService,private build:FormBuilder,private router:Router,private http:HttpClient) {
    this.loginService.loginStatus.subscribe((status=>{
      this.Loginstatus=status;

    }))
   }

   ngOnInit(): void {
     this.Login();
    }
  Login(): void{
    this.LoginForm=this.build.group({
      email:new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl(null,Validators.required),
    });
      }
      OnSubmit(){
        if(this.LoginForm.status==="VALID"){
          let params = new HttpParams();
          params=params.append("email",this.LoginForm.value['email'])
          params=params.append("password",this.LoginForm.value['password'])
          this.loginService.login(ApiManager.LOGIN_API+'?'+params).subscribe(response=>{
              this.Loginstatus=true;
              this.loginService.loginStatus.next(this.Loginstatus)
              this.toastr.success("Login Successfully")
              this.router.navigate(['/listing']);
          },
          err=>{
          this.toastr.warning("Please enter a valid username or password !")

          } )
        }else{
          if(this.LoginForm.get('email')==null || this.LoginForm.get('password')==null){}
          this.toastr.warning("Please enter a valid username or password !")


        }

      }

}
