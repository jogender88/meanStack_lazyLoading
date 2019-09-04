import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  constructor(private http:HttpClient) { }

  save(user){
    return this.http.post('http://localhost:8080/save/',user)
    .catch(this.errorHandler)

    // .pipe(map((response: Response)=> response.json()))
  }
  GetUser(){
    return this.http.get('http://localhost:8080/getUser/')
    .catch(this.errorHandler)
    
    // .pipe(map((response: Response)=> response))
  }
  deleteUser(id){
    return this.http.post('http://localhost:8080/delete/',{'id': id})
    
    // .pipe(map((response: Response)=> response.json()))
  }
  getDeletedUser(){
    return this.http.get('http://localhost:8080/getDeletedUser/')
  }
  admindeleteUser(id){
    return this.http.post('http://localhost:8080/admindelete/',{'id': id})
    // .pipe(map((response: Response)=> response.json()))
  }
  login(user){
    return this.http.post('http://localhost:8080/login/',user)
    // .pipe(map((response: Response)=> response.json()))
  }
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message)
  }
}