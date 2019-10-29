import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { CommandName } from 'protractor';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }
  public currentUser: any;
  public userStatus: string;
  public course: CoursesService;
  public id: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  

  signUp(email:string, password:string, role:string){
  
    
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       let user = {
        id: userResponse.user.uid,
        email: userResponse.user.email,
        role: role,
        count:0,
        cname1:'',
        cname2:'',
       }
       
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate([""]);
        })
       }).catch(err => {
         console.log(err);
       })
       
      
     })
     .catch((err)=>{
        console.log("An error ocurred: ", err);
     })
    }

    login(email: string, password: string) {
      
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser)
            if(userRef.data().role !== "Admin") {
              this.router.navigate(["student"]);
              console.log(userRef.data().cname);
              this.id=(userRef.ref.id);
            }else{
              this.router.navigate(["admin"]);
              console.log(userRef.data().cname);
              this.id=(userRef.ref.id); 
            }
          })
        })
      }).catch(err => err)
  }

  checkCourse(course){
    console.log(course);
    this.firestore.collection("users").ref.where("cname1", "==", course).onSnapshot(snap =>{
      snap.forEach(userRef => {
        let cn=userRef.data().cname2;
        console.log(cn);
        let x=userRef.data().count-1;
        this.firestore.collection("users").doc(userRef.ref.id).update({cname1: cn});
        this.firestore.collection("users").doc(userRef.ref.id).update({count: x});
        this.firestore.collection("users").doc(userRef.ref.id).update({cname2: ""});
      })
  })
  this.firestore.collection("users").ref.where("cname2", "==", course).onSnapshot(snap =>{
    snap.forEach(userRef => {
      let x=userRef.data().count-1;
      this.firestore.collection("users").doc(userRef.ref.id).update({cname2: ""});
      this.firestore.collection("users").doc(userRef.ref.id).update({count: x});
    })
  })
}

  updateCount(name){
      console.log(this.id);
      let count=this.currentUser.count+1; 
      if (count <= 2) {
        this.firestore.collection("users").doc(this.id).update({count: count});
        if(count==1){
          this.firestore.collection("users").doc(this.id).update({cname1: name.$key});
        }
        else{
          this.firestore.collection("users").doc(this.id).update({cname2: name.$key});
        }
        return Promise.resolve('Successfully Enrolled' + count);
      } else {
        return Promise.reject('Sorry! Cannot enrol for more than two courses.');
      }
  }



  logOut(){
    this.afAuth.auth.signOut()
    .then(()=>{
      console.log(this.id);
      console.log("user signed Out successfully");
      this.currentUser = null;
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["home"]));
    }).catch((err) => {
      console.log(err);
    })
  }
}