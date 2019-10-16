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


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required),
    price: new FormControl('', Validators.required)
  });


  getProducts() {
    this.courseList = this.firebase.list('courses');
    return this.courseList.snapshotChanges();
  }

  insertCourse(course) {
    this.courseList.push({
      name: course.name,
      description: course.description,
      price: course.price
  });
}
}