import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import { trigger,  style, animate, transition } from '@angular/animations';
import { StudentService } from '../student.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('form', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class RegisterComponent implements OnInit {
  cmxform: FormGroup;
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    console.log("INFO ",this.info);
  }

  constructor(private fb: FormBuilder,public auth: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>,  @Inject(MAT_DIALOG_DATA) public info: string, private studentService: StudentService)
    {
    this.cmxform=fb.group({
      name: ['',Validators.required],
      year: ['',Validators.required],
      depart: ['',Validators.required],
      email: ['', Validators.required ],
    });
  }
  
  PostData(dataForm) {
    console.log(dataForm);
    console.log(this.info);
    console.log(typeof dataForm);
    this.studentService.insertStudent(this.info.$key,dataForm);
    this.studentService.updateCount(this.info);
    this.auth.updateCount(this.info);
    this.onClose();
  }
  
  onClose() {
    this.dialogRef.close({data:'data'});
  }
}