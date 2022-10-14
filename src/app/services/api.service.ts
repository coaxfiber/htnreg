import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/xml',
      'Authorization': 'jwt-token'
    })
  };

  constructor(private http: HttpClient) { }

  saveDetails(body:any){
    //return this.http.post(environment.BASE_URL+'participant/register', body, this.httpOptions)
    return this.http.post("https://jsonplaceholder.typicode.com/posts", body, this.httpOptions)
   
  }
}
