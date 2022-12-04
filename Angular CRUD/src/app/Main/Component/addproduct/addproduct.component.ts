import { HttpClient } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../Model/product';
import { ApiService } from '../../services/api.service';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  ActionButton:string="Save"
  productForm !:FormGroup
  FreshnessList=['Brand 1','brand 2','brand 3'];

  constructor( private _formbuilder:FormBuilder,
    private _api :ApiService,
    @Inject(MAT_DIALOG_DATA) public EditData :any,
    private _matdialog : MatDialogRef<AddproductComponent>) { }

  ngOnInit(): void {
    this.productForm=this._formbuilder.group({
      Name:["",Validators.required],
      Category:["",Validators.required],
      Price:["",Validators.required],
      Date:["",Validators.required],
      Freshness:["",Validators.required],
      Comments:["",Validators.required],
   
     
    })
    
    if(this.EditData){
    this.productForm.controls['Name'].setValue(this.EditData.name)
    this.productForm.controls['Category'].setValue(this.EditData.category)
    this.productForm.controls['Price'].setValue(this.EditData.price)
    this.productForm.controls['Date'].setValue(this.EditData.date)
    this.productForm.controls['Freshness'].setValue(this.EditData.freshness)
    this.productForm.controls['Comments'].setValue(this.EditData.comments)
    
this.ActionButton="Update"
    }
  }

  AddProduct():void{
    if(!this.EditData){
      if(this.productForm.valid){

        this._api.Add(this.productForm.value)
        .subscribe(
          (response:any)=>{
           // alert("data inserted");    
            //alert(JSON.stringify(this.productForm?.value)) ;
            this.productForm.reset;
            this._matdialog.close("Save");
  
          },
          (error:any)=>{
           // alert("error")
            
          }
        )
      }
    }
    else{
      alert(this.EditData.id)
      this._api.Update(this.productForm.value,this.EditData.id)
      .subscribe(
        (Response:any)=>{
          // alert("update successfuly")
          this.productForm.reset;
          this._matdialog.close("Update");
        }, 
        (error:any)=>{
         // alert("error in update")
          this._matdialog.close("Update");
          
        }
      )

    }

  }


}
