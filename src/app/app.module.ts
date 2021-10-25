import { NgModule } from '@angular/core';
import { RouterModule, Routes,CanActivate } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductEditingComponent } from './product-editing/product-editing.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginauthGuard } from './login/loginauth.guard';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  {path: '', component:LoginComponent,pathMatch:'full'},
  {path: 'listing',canActivate:[LoginauthGuard] ,component:DashboardComponent},
  {path: 'listingAdd',canActivate:[LoginauthGuard] ,component:ProductEditingComponent},
  {path: 'listing/buisnessAdd', canActivate:[LoginauthGuard],component:ProductListingComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductEditingComponent,
    ProductListingComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [

    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo-g33ORfWxvqxxCF2BVoirFyzQgDJXDA'
    })
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
