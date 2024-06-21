import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatRadioModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {
  
  // Injections
  _formbuilder = inject(FormBuilder);
  _empService = inject(EmployeeService);
  _dialogRef = inject(MatDialogRef<EmpAddEditComponent>);
  data = inject(MAT_DIALOG_DATA);
  coreService = inject(CoreService);

  // Data declarations
  education:string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
  empForm = this._formbuilder.group({
    firstName : '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    company: '',
    experience: '',
    package: ''
  })//.patchValue(this.data);

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  // Methods
  onFormSubmit(){
    if(this.empForm.valid){
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next : (val:any) => {
            // alert('Employee updated successfully');
            this.coreService.openSnackBar('Employee updated successfully')
            this._dialogRef.close(true);
          },
          error: (err:any) => {}
        })
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next : (val:any) => {
            // alert('Employee added successfully');
            this.coreService.openSnackBar('Employee added successfully')
            this._dialogRef.close(true);
          },
          error: (err:any) => {}
        })
      }
    }
  }
}
