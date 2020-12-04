import { Component, OnInit } from '@angular/core';
import { ProvinsiService } from '../provinsi.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  provinsi: any;
  
  contacts: any;
  userEmail: string;
  flag: string = '0';

  constructor(
    private provinsiSrv: ProvinsiService,
    private authSrv: AuthService,
    private navCtrl: NavController,

    ) { }

  ngOnInit() {
    this.provinsiSrv.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.provinsi = data;
      // console.log(this.provinsi);
    });

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
