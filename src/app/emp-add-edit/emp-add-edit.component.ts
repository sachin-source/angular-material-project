import { Component, inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { provideHttpClient } from '@angular/common/http';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatRadioModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent {
  
  // Injections
  _formbuilder = inject(FormBuilder);
  _empService = inject(EmployeeService);
  _dialogRef = inject(DialogRef<EmpAddEditComponent>);

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
  })

  // Methods
  onFormSubmit(){
    if(this.empForm.valid){
      this._empService.addEmployee(this.empForm.value).subscribe({
        next : (val:any) => {
          alert('Employee added successfully');
          this._dialogRef.close()
        },
        error: (err:any) => {}
      })
    }
  }
}
