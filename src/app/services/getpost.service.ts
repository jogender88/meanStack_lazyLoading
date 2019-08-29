import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  constructor(private http:HttpClient) { }

  save(user){
    return this.http.post('http://localhost:8080/save/',user)
    // .pipe(map((response: Response)=> response.json()))
  }
  GetUser(){
    return this.http.get('http://localhost:8080/getUser/')
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
}