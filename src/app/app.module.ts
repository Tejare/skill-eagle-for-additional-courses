import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { StudentListComponent } from './student-list/student-list.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { CoursesService } from './courses.service';
import { AddComponent } from './add/add.component';
import { EnroledComponent } from './enroled/enroled.component';
import { LinstComponent } from './linst/linst.component';
import { InstantiateExpr } from '@angular/compiler';

const config = {
  apiKey: "AIzaSyAWFoRtXxkNDXAVjVrhbXYy7aqdwxQbZfY",
  authDomain: "minorp-2e834.firebaseapp.com",
  databaseURL: "https://minorp-2e834.firebaseio.com",
  projectId: "minorp-2e834",
  storageBucket: "minorp-2e834.appspot.com",
  messagingSenderId: "673778669939",
  appId: "1:673778669939:web:6fb300a5b9e4d73e338d06",
  measurementId: "G-SCWX72LNWP"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    StudentComponent,
    RegisterComponent,
    StudentListComponent,
    SignupComponent,
    AddComponent,
    EnroledComponent,
    LinstComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AngularFirestoreModule.enablePersistence(),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(config),
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'home',component:StudentComponent},
      {path:'',component:HomeComponent},
      {path:'add',component:AddComponent},
      {path:'login',component:LoginComponent},
      {path:'signup',component:SignupComponent},
      {path:'register',component:RegisterComponent},
      {path:'student',component:StudentComponent},
      {path:'admin',component:AdminComponent},
      {path:'linst',component:LinstComponent},
      {path:'studentlist/:$key',component:StudentListComponent},
    ]),
  ],
  providers: [AuthService,CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
