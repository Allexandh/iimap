import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userid: any;
  nama: any;
  email: any;
  linkfoto: any;

  data: any;
  // userRef: AngularFireList<User> = null;
  //asd
  constructor(
    private authSrv: AuthService,
    private fireAuth: AngularFireAuth,

  ) { }

  test(){
    console.log("ubahh")
  }

  ngOnInit() {
    this.fireAuth.user.subscribe((data => {
      this.userid = data.uid;
      this.authSrv.getData(this.userid).then(
        (res) => {
          // console.log(res.email)
          this.nama = res.nama;
          this.email = res.email;
          this.linkfoto = res.linkfoto;
        }
      );
    }));
    // this.authSrv.getData().then(
    //   (res) => {
    //     console.log(res);
    //     // this.contact = res
    //     // this.nama = this.contact.nama;
    //     // this.phone = this.contact.phone;
    //     // this.email = this.contact.email;
    //     // this.location = this.contact.location;
    //   }
    // );
    // this.userid = this.authSrv.getData();
    // console.log(this.userid);
  }

}
