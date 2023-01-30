import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postContract(data : any){
    return this.http.post<any>("http://localhost:3000/contractLists/",data)
  }
  getContract(){
    return this.http.get<any>("http://localhost:3000/contractLists")
  }
  putContract(data : any,id : number){
    return this.http.put<any>("http://localhost:3000/contractLists/"+id,data)
  }
  deleteContract(id : number){
    return this.http.delete<any>("http://localhost:3000/contractLists/"+id)
  }
}
