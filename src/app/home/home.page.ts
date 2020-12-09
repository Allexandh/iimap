import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProvinsiService } from '../provinsi.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PostingService } from '../posting.service';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import imageMapResize from 'image-map-resizer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('image-map', {read: ElementRef, static:false}) mapRef: ElementRef;
  provinsi: any;
  
  contacts: any;
  userEmail: string;
  flag: string = '0';
  userid: any;
  posting: any;

  constructor(
    private provinsiSrv: ProvinsiService,
    private authSrv: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private postingSrv: PostingService, 
    private fireAuth: AngularFireAuth,

    ) { }
  ionViewDidEnter() {
    imageMapResize();
  }
  ngOnInit() {
    console.log(Map);
    
    // imageMapResize();
    this.provinsiSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.provinsi = data;
      // console.log(this.provinsi);
    });

    this.postingSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.posting = data;
      console.log(data);
      console.log(data.length);
      // console.log(this.provinsi);
    });

    this.fireAuth.user.subscribe((data => {
      this.userid = data.uid;
      console.log(this.userid);

      // this.provinsiSrv.getAllBookmark().snapshotChanges().pipe(
      //   map(changes =>
      //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      //   )
      // ).subscribe(data => {
      //   data.forEach(element => {
      //     // console.log("MASUK ELEMENT");
      //     // console.log(this.userid);
      //     if (element['userid'] == this.userid
      //       && element['provinsiid'] == this.id) {
      //       // console.log(element);
      //       this.booked = 1;
      //       this.key = element['key'];
      //     }
      //   });
      // });
    }));

    this.authSrv.userDetails().subscribe(res => {
      if (res != null) {
        this.userEmail = res.email;
        this.flag = '1';
        // console.log("masuk")
      } else {
        // console.log("belom")
        this.flag = '0';
        this.navCtrl.navigateBack('')
      }
    })
    // console.log("asd");
  }


  
  submitPost(form: any) {
    console.log(form);
    let dataPost: any = {
      comment: form.value.comment,
      userid: this.userid,
    }
    this.postingSrv.create(dataPost);
    // this.postingSrv.create(dataBook).then(res => {
    //   this.router.navigateByUrl('/tabs/home');
    // }).catch(error => console.log(error));

    // dataBook.reset();
    // this.router.navigateByUrl('/tabs/home');
  }

  logout() {
    // console.log("logout")
    this.authSrv.logoutUser()
      .then(res => {
        this.flag = '0';
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error)
      })
  }

}
