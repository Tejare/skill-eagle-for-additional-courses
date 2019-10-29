import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  courseArray=[];
  constructor(public authService: AuthService,
     private router: Router,
     private courseService: CoursesService) { }

  ngOnInit() {
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

  onEnroll(course) {
    this.router.navigate(['/studentlist', course.$key]);
    // console.log(product.$key);
    }

  logout() {
    this.authService.logOut()
  }
}
