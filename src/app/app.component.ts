import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  employees: any[] = [];
  isEdit = false;

  employee={
    id: 0,
    name: ''
  }

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get('http://localhost:3000').subscribe(
      {
        next: (res: any) => {
          this.employees = res;
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  addEmployee() {
    this.http.post('http://localhost:3000', this.employee).subscribe(
      {
        next: (res: any) => {
          this.getEmployees();
          this.employee = {id: 0, name: ''};
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  deleteEmployee(id: any) {
    this.http.delete('http://localhost:3000/' + id).subscribe(
      {
        next: (res: any) => {
          this.getEmployees();
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  onEditClick(employee: any) {
    this.isEdit = true;
    this.employee = { id: employee.id, name: employee.name};
  }

  cancelEdit() {
    this.isEdit = false;
    this.employee = {id: 0, name: ''};
  }

  saveEmployee() {
    this.http.put('http://localhost:3000', this.employee).subscribe(
      {
        next: (res: any) => {
          this.cancelEdit();
          this.getEmployees();
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

}