import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http = inject(HttpClient);
  constructor() { }
  addEmployee(data:any) : Observable<any> {
    return this.http.post('http://localhost:3000/employees', data)
  }
}
