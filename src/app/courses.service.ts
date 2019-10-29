import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private firebase: AngularFireDatabase) {
  }

  courseList: AngularFireList<any>;
  t = new Date().toISOString();
  
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    price: new FormControl('', Validators.required),
    min:new FormControl('',Validators.required),
    count:new FormControl(0),
    date:new FormControl(''),
  });


  getProducts() {
    this.courseList = this.firebase.list('courses');
    return this.courseList.snapshotChanges();
  }

  insertCourse(course) {
    this.courseList.push({
      name: course.name,
      description: course.description,
      price: course.price,
      date:this.t,
      count:0,
      min: course.min,
  });
}

}