import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { RegisterComponent } from '../register/register.component';
import { CoursesService } from '../courses.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private authService: AuthService,
  private courseService: CoursesService,
  public dialog: MatDialog,
  private firebase: AngularFireDatabase) { }

  courseArray = [];
  t=new Date().toISOString();
  
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

  checkDate(){
    console.log("hgfs",this.courseArray);
    console.log(this.t);
    for(let x in this.courseArray){
      let g=this.courseArray[x].date;
      let c=this.courseArray[x].count;
      let m= this.courseArray[x].min;
      console.log(c,m,g);
      if(g<this.t && c<m){
        console.log(g,this.t,x," YES");
        this.firebase.list('courses/'+this.courseArray[x].$key).remove();
        this.authService.checkCourse(this.courseArray[x].$key);
      }
      else{
        console.log("NO");
      }
    }

  }



  openDialog(course) {
    console.log(course.$key);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data=course;
    this.dialog.afterAllClosed.subscribe(data=> this.ngOnInit());
    this.dialog.open(RegisterComponent,dialogConfig).afterClosed();
  }

  logout() {
    this.checkDate();
    this.authService.logOut()
  }
 
}
