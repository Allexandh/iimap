import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraResultType, CameraSource } from '@capacitor/core';
import { Capacitor } from '@capacitor/core/dist/esm/global';
import { Camera } from '@capacitor/core/dist/esm/web/camera';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;


  userid: any;
  nama: any;
  email: any;
  linkfoto: any;

  // data: any;

  photo: SafeResourceUrl;
  isDesktop: boolean;

  link: any;
  src: any;

  captureDataUrl: string;

  
  constructor(
    private platform: Platform,
    private authSrv: AuthService,
    private fireAuth: AngularFireAuth,
    // private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
    this.fireAuth.user.subscribe((data => {
      this.userid = data.uid;
      this.authSrv.getData(this.userid).then(
        (res) => {
          this.nama = res.nama;
          this.email = res.email;
          this.linkfoto = res.linkfoto;
        }
      );
    }));
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);

    this.authSrv.updateUser(this.userid, form.value).then(res => {
      this.router.navigateByUrl('/tabs/profile');
    }).catch(error => console.log(error));

    form.reset();
    this.router.navigateByUrl('/tabs/profile');
  }



  async ubahfoto() {
    if (!Capacitor.isPluginAvailable('Camera') || this.isDesktop) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.link = this.authSrv.ups(this.userid, image.dataUrl);
    // console.log(this.link)
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      // console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
      this.link = this.authSrv.upload(this.userid,file);
      // this.src = this.link;
    };
    reader.readAsDataURL(file);
  }

}
