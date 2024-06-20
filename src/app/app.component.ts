import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, EmpAddEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  // Injections
  readonly dialog = inject(MatDialog);
  employeeService = inject(EmployeeService)

  readonly data$ = this.employeeService.getEmployeeList();

  openAddEditEmpForm(){
    this.dialog.open(EmpAddEditComponent)
  }

  // getEmployeeList() {
  //   this.employeeService.getEmployeeList().subscribe({
  //     next : console.log,
  //     error: console.log
  //   })
  // }
}
