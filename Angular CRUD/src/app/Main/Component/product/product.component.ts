import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from '../../Model/product';
import { ApiService } from '../../services/api.service';
import { AddproductComponent } from '../addproduct/addproduct.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RouterLinkWithHref } from '@angular/router';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // products:Product[]=[];
  displayedColumns: string[] = ['id', 'name', 'category', 'price','freshness','date','comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor( private dialop:MatDialog,private _api:ApiService) { }

  ngOnInit(): void {
    this.GetAll();
  }

  openDialog() {
    this.dialop.open(AddproductComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=="Save"){
        this.GetAll();
      }
    })
  }

  GetAll(){

    this._api.GetAll().
    subscribe(
      (Response:any)=>{
        this.dataSource=new MatTableDataSource(Response);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        console.log(Response);
      },
      (error:any)=>{
        alert("error in get all data ")
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Edit(row:any){
    this.dialop.open(AddproductComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=="Update"){
        this.GetAll();
      }
    })
  }

  Remove(id:number){
    this._api.Delete(id)
    .subscribe(
    {
      next:(res)=>{//alert("delte successfuly")
      this.GetAll()
    },
      error:()=>{//alert("error in deltete") 
      this.GetAll()}
    }
    )
  }


}
