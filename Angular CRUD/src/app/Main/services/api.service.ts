import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _HttpClient :HttpClient) { }

  Add(data:any){
    return this._HttpClient.post<any>(`https://localhost:7284/api/Product`,data)
  }

  GetAll(){
    return this._HttpClient.get<any>(`https://localhost:7284/api/Product`)
  }

  Update(data:any,id:number){
    return this._HttpClient.put<any>(`https://localhost:7284/api/Product/${id}`,data)
  }

  Delete(id:number ){
    return this._HttpClient.delete(`https://localhost:7284/api/Product/${id}`)
  }


}
