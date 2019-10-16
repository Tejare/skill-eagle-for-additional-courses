import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }
  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }



  signUp(email:string, password:string){
  
    
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       let user = {
        id: userResponse.user.uid,
        email: userResponse.user.email,
        role: "user",
       }
       
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.router.navigate(["/"]);
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
      
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser)
            if(userRef.data().role !== "admin") {
              this.router.navigate(["student"]);
            }else{
              this.router.navigate(["admin"]);
            }
          })
        })
       
      }).catch(err => err)
  }

  logOut(){
    this.afAuth.auth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      this.currentUser = null;
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["home"]));
    }).catch((err) => {
      console.log(err);
    })
  }
}
