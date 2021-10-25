import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiManager } from '../services/api';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  loginarr:any;
  Locationarr: any;
  router1:any;
  constructor(private toastr:ToastrService,private product:ProductsService) { }
  ngOnInit(): void {
  this.initialize();
  this.listbuisness();
  }
  listbuisness(){
    this.product.ListData(ApiManager.ADD_PRODUCT,0).subscribe(response => {
      this.Locationarr=response;
    }, err=>{
      this.toastr.warning(err.message);
    })
  }

  initialize(){
    this.loginarr=[
      {name: 'Add Buisness',route: 'buisnessAdd'},
      {name: 'Log In',route: ''},
      {name: 'Sign Up',route: '/listingAdd'},
    ];
  }
}
