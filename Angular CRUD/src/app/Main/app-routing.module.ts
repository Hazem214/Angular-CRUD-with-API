import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/Home/home.component';
import { ProductComponent } from './Component/product/product.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"product",component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
