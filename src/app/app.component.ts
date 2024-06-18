import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import {
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, EmpAddEditComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly dialog = inject(MatDialog);

  openAddEditEmpForm(){
    this.dialog.open(EmpAddEditComponent)
  }

}
