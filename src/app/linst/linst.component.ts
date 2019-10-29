import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-linst',
  templateUrl: './linst.component.html',
  styleUrls: ['./linst.component.css']
})
export class LinstComponent implements OnInit {

  cmxform: FormGroup;
 
  constructor(private fb: FormBuilder,
    private firebaseService: AuthService) {
    this.cmxform=fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required]
    });;
  }
  ngOnInit() {
  }
PostData(dataForm) {
    console.log(dataForm);
    console.log(typeof dataForm);
    this.firebaseService.login(dataForm["email"], dataForm["password"]).then(value => {
      console.log("Value",value);
    });
  }
}
