import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CoreService } from './core/core.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, EmpAddEditComponent, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, DatePipe, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  // Injections
  readonly dialog = inject(MatDialog);
  employeeService = inject(EmployeeService);
  coreService = inject(CoreService);

  // readonly data$ = this.employeeService.getEmployeeList();

  openAddEditEmpForm(){
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList()
        }
      }
    })
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.getEmployeeList()
  }
  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe({
      next: (res:any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }, 
      error : console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:any){
    this.employeeService.deleteEmployee(id).subscribe({
      next: (value:any) => {
        this.coreService.openSnackBar('Employee deleted!', 'Done')
        this.getEmployeeList()
      },
      error: console.log
    })
  }


  openEditForm(data:any){
    const dialogRef = this.dialog.open(EmpAddEditComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      }
    })
  }
}