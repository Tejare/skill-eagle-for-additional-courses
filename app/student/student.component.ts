import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { RegisterComponent } from '../register/register.component';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private authService: AuthService,
  private courseService: CoursesService,
  public dialog: MatDialog) { }

  courseArray = [];

  ngOnInit(): void {
    this.courseService.getProducts().subscribe(
      list => {
        this.courseArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        console.log(this.courseArray);
      });
  }

  openDialog(course) {
    console.log(course.$key);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=course.$key;
    this.dialog.afterAllClosed.subscribe(data=> this.ngOnInit());
    this.dialog.open(RegisterComponent,dialogConfig).afterClosed();
  }

  logout() {
    this.authService.logOut()
  }
 
}
