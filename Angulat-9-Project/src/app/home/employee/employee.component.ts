import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeModel } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  public empList: EmployeeModel[] = [];
  public employee: EmployeeModel = new EmployeeModel();
  public isCreateView: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.isCreateView = false;
    this.employeeService.getEmployeelist().subscribe((res: any) => {
      this.empList = res;
    }, (error) => {
      console.log(error);
    });
  }

  createEmployee() {
    this.isCreateView = true;
    this.employee = new EmployeeModel();
  }

  editData(emp: any) {
    this.isCreateView = true;
    this.employee = new EmployeeModel();
    this.employee = emp;
  }

  saveEmployee() {
    if (this.employee.empId == undefined || this.employee.empId <= 0) {
      this.employee.empId = 0;
      this.addEmployee(this.employee);
    }
    else {
      this.updateEmployee(this.employee);
    }
  }

  addEmployee(employee: EmployeeModel) {
    this.employeeService.saveEmployee(employee).subscribe((res: any) => {
      if (res > 0) {
        alert("Record Saved");
      }
      this.getEmployeeList();
      this.isCreateView = false;
    }, (error) => {
      console.log(error);
    });
  }

  updateEmployee(employee: EmployeeModel) {
    this.employeeService.updateEmployee(employee).subscribe((res: any) => {
      if (res > 0) {
        alert("Record Updated");
      }
      this.getEmployeeList();
      this.isCreateView = false;
    }, (error) => {
      console.log(error);
    });
  }

  

  deleteEmployee(emp: EmployeeModel) {
    this.isCreateView = false;
    this.employeeService.deleteEmployee(emp.empId).subscribe((res: any) => {
      if (res > 0) {
        alert("Record Deleted");
      }
      this.getEmployeeList();
    }, (error) => {
      console.log(error);
    });
  }

  cancel() {
    this.isCreateView = false;
  }

}
