import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
