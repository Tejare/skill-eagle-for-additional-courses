import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireObject } from 'angularfire2/database';
import { Route, ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  key = '';
  productList: AngularFireObject<any>;
  
  constructor(private studentService: StudentService,
    private _location: Location,
    private route: ActivatedRoute) { } 
  
  formControls = this.studentService.form.controls;
  studentArray=[];

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('$key');
    console.log(this.key);
    this.studentService.getStudents(this.key).subscribe(
      list => {
        this.studentArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        console.log(this.studentArray);
      });
  }

  goback(){
    this._location.back();
  }
}