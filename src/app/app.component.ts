import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor(){
    this.createForm();
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeList = parseData;
    }
  }
  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode),
      state: new FormControl(this.employeeObj.state),
      contactNo: new FormControl(this.employeeObj.contactNo)
    })
  }

  onSave(){
    debugger;
    const oldData = localStorage.getItem("EmpData");
    if(oldData != null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empId'].setValue(parseData.length +1)
      this.employeeList.unshift(this.employeeForm.value);
    }
    else{
      this.employeeList.unshift(this.employeeForm.value);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    }
  }
  onEdit(item: EmployeeModel){
    this.employeeObj = item;
    this.createForm();
  }
  onUpdate(){
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empId'].value )
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
    
    
  }
}
