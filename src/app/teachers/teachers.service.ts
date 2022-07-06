import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Teacher } from './store/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient) { }

  get(){
    return this.http.get<Teacher[]>("http://localhost:3000/teachers")
  }

  create(payload: Teacher) {
    return this.http.post<Teacher>("http://localhost:3000/teachers", payload)
  }

  update(payload: Teacher) {
    return this.http.put<Teacher>(
      `http://localhost:3000/teachers/${payload.id}`,
      payload
    )
  }

  delete(id:number){
    return this.http.delete(`http://localhost:3000/teachers/${id}`)
  }
}
