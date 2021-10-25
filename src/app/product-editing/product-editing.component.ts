import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-editing',
  templateUrl: './product-editing.component.html',
  styleUrls: ['./product-editing.component.css']
})
export class ProductEditingComponent implements OnInit {
  RegisterForm!: FormGroup;
  filename:any;
  imageUrl:any;
  bfile:any;
  resumebase64:any;
  fileSelected:any;
  buttonMode:any;
  ParamRoute:any;
  navigation:any;
  data:any;
              constructor(private toastr:ToastrService,private product:ProductsService,private sant: DomSanitizer,private build:FormBuilder,private activatedRoute:ActivatedRoute,private router:Router) {
                this.navigation = this.router.getCurrentNavigation();
                  this.data=this.navigation?.extras;
               }

  ngOnInit(): void {
    this.register();
  }
  // to se focus
  setFocus(targetInput: any) {
    var targetElem = document.getElementById(targetInput);
    setTimeout(function waitTargetElem() {
      if (document.body.contains(targetElem)) {
        targetElem!.focus();
      } else {
        setTimeout(waitTargetElem, 100);
      }
    }, 100);
  }
  register(){
    this.RegisterForm=this.build.group({
      Name:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required),
      businessname:new FormControl(null,Validators.required),
    });
  }
  OnSubmit(RegisterForm: any){
    if(this.RegisterForm.status==="VALID"){
        this.product.addData(ApiManager.ADD_USER,this.RegisterForm.value).subscribe(response =>{
         this.toastr.success("User Added successfully.")
         this.router.navigate(['/listing']);
        }, err =>{
         this.toastr.warning("Something went wrong.")
        })
    }else{
      if(this.RegisterForm.value['Name']==null){
        this.toastr.warning("Name is required !")
        this.setFocus('name');
      }else if(this.RegisterForm.value['email']==null){
        this.toastr.warning("Email is required !")
        this.setFocus('description');
      }else if(this.RegisterForm.value['password']==null){
        this.toastr.warning("password is required !")
        this.setFocus('Price');
      }else if(this.RegisterForm.value['businessname']==null){
        this.toastr.warning("Business name is required !")
        this.setFocus('Quantity');
      }
    }
  }

}
