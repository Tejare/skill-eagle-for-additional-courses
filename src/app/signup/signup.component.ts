import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
      role: ['',Validators.required],
    });
  }

  tryRegister(email:string, password:string, role:string) {
    console.log('scope is ' + email+password+role);
    this.auth.signUp(email, password, role);
  }
}
