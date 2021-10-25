import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
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
      businessname:new FormControl(null,Validators.required),
      branch:new FormControl(null,Validators.required),
      latitude:new FormControl(null,Validators.required),
      longitude:new FormControl(null,Validators.required),
    });
  }
  OnSubmit(RegisterForm: any){
    if(this.RegisterForm.status==="VALID"){


        this.product.addData(ApiManager.ADD_PRODUCT,this.RegisterForm.value).subscribe(response =>{
         this.toastr.success("Buisness Added successfully.")
         this.router.navigate(['/listing']);
        }, err =>{
         this.toastr.warning("Something went wrong.")
        })
    }else{
      if(this.RegisterForm.value['businessname']==null){
        this.toastr.warning("Business name is required !")
        this.setFocus('name');

      }else if(this.RegisterForm.value['branch']==null){
        this.toastr.warning("Branch is required !")
        this.setFocus('description');

      }else if(this.RegisterForm.value['latitude']==null){
        this.toastr.warning("Latitude is required !")
        this.setFocus('Price');

      }else if(this.RegisterForm.value['Price']==null){
        this.toastr.warning("Longitude is required !")
        this.setFocus('Quantity');

      }
    }
  }

}
