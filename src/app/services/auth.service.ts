import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
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
    private storage: AngularFireStorage,

  ) {
    this.userRef = db.list(this.dbPath);

  }

  updateUser(key:string, value:any): Promise<void>{
    return this.userRef.update(key, value);
  }

  getUser(uid:any){
    return this.db.database.ref('/users/' + uid).once('value').then(function (snapshot) {
      // console.log(snapshot.val().makanan.split(','))
      // console.log(snapshot.val())
      const returnData: User = {
        "uid": uid,
        "email": snapshot.val().email,
        "nama": snapshot.val().nama,
        "linkfoto": snapshot.val().linkfoto,
      }
      return returnData;
    })
  }


  ups(uid: any, file: any) {
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);
    // console.log("UPS");
    return this.storage.ref('images/').child(randomId + ".jpg").putString(file, 'data_url').then(snapshot => {
      return this.storage.ref('images/' + randomId + ".jpg").getDownloadURL().toPromise().then(res => {
        const data: any = {
          linkfoto: res,
        }
        this.uploadLinkFoto(uid, data);
        return res;
      });
    });


  }

  async upload(uid: any, file: any): Promise<any> {
    const randomId = Math.random()
      .toString(36)
      .substring(2, 8);

    if (file) {
      try {
        const task = await this.storage.ref('images').child(randomId + ".jpg").put(file).then(snapshot => {
        });

        return this.storage.ref('images/' + randomId + ".jpg").getDownloadURL().toPromise().then(res => {
          const data: any = {
            linkfoto: res,
          }
          this.uploadLinkFoto(uid, data);
          return res;
        });
        // return;
      } catch (error) {
        // console.log(error)
      }
    }
  }

  uploadLinkFoto(key: string, value: any): Promise<void> {
    // console.log(key);
    // console.log(value);
    return this.userRef.update(key, value);
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

  getData(uid: any) {
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
