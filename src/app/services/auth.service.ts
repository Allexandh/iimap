import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private dbPath = '/users';
  userRef: AngularFireList<User> = null;
  userRefObj: AngularFireObject<User> = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
    // this.userRef = db.list(this.dbPath);
    
  }



  createUser(user: User): any {
    return this.db.object('/users/' + user.uid).set({
      email: user.email,
      uid: user.uid,
      nama: user.nama,
      linkfoto: user.linkfoto,
    });

  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);
            console.log(res.user.uid)
            let user: User = {
              email: value.email,
              uid: res.user.uid,
              nama: value.nama,
              linkfoto: 'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
            };
            this.createUser(user);
          },
          err => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });
  }

  logoutUser() {
    return new Promise<any>((resolve, reject) => {
      if (this.fireAuth.currentUser) {
        this.fireAuth.signOut()
          .then(() => {
            console.log('log out');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }
  
  getData(uid:any){
    // console.log(uid);
    return this.db.database.ref('/users/' + uid).once('value').then(function (snapshot) {
      // console.log(snapshot.val());
      return snapshot.val();
    })
  }

  userDetails() {
    return this.fireAuth.user;
  }
}
