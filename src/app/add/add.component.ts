import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(public courseService: CoursesService) {}

  formControls = this.courseService.form.controls;

  ngOnInit() {
    this.courseService.getProducts();
  }

  onSubmit() {
    console.log(this.courseService.form.valid);
        this.courseService.insertCourse(this.courseService.form.value);
   }
}
