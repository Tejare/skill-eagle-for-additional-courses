import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  constructor(private firebase: AngularFireDatabase) {
  }

  courseList: AngularFireList<any>;


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',Validators.required),
    year: new FormControl('', Validators.required),
    depart: new FormControl('',Validators.required)
  });


  getStudents(key) {
    this.courseList = this.firebase.list('enroll/'+key);
    return this.courseList.snapshotChanges();
  }
  
  updateCount(course){
    console.log("Hello",course.count);
    let x=course.count+1;
    this.firebase.list('courses/').update(course.$key,{count:x});
    console.log(x);
  }
  
  insertStudent(course,student) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    firebase.database().ref('enroll/' + course+"/"+newPostKey).set({
        name: student.name,
        email: student.email,
        year : student.year,
        depart: student.depart
      });
    }
}