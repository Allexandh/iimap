import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinsiService } from 'src/app/provinsi.service';

declare var google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  datas: any;
  provinsi: string;
  tempat: string;
  map: any;
  kordinat: any;;
  position: any;
  @ViewChild('map', {read: ElementRef, static:false}) mapRef: ElementRef;
  infoWindow: any = new google.maps.InfoWindow();
  constructor(private route: ActivatedRoute, private router: Router, private provinsiSrv: ProvinsiService) {
    // this.route.queryParams.subscribe(params => {
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     this.kordinat = this.router.getCurrentNavigation().extras.state.kordinat;
    //     this.tempat = this.router.getCurrentNavigation().extras.state.tempat;
    //     this.position = {
    //       lat: this.kordinat.Lat[this.tempat],
    //       lng: this.kordinat.Long[this.tempat]
    //     }
        
    //   }
    //   console.log(this.kordinat);
    //   console.log(this.tempat);
    // });
   }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap)=>{
      if(!paramMap.has("provinsi") || !paramMap.has("provinsi")){
        return;
      }
      const key = paramMap.get("provinsi");
      this.provinsi = key;
      const tempat = paramMap.get("tempat");
      this.tempat = tempat;
      console.log(this.provinsi);
      console.log(this.tempat);
    })
    this.provinsiSrv.getProvinsi(this.provinsi).then(
      (res) => {
        this.datas = res
        this.kordinat = this.datas.kordinat;
        
        this.position = {
          lat: this.kordinat.Lat[this.tempat],
          lng: this.kordinat.Long[this.tempat]
        }
        this.initMap(this.position);
      }
     
    );
  }
  ionViewDidEnter(){
    // this.initMap(this.position);
  }
  initMap(pos: any){
    const icon = {
      url: 'assets/marker2.png', // image url
      scaledSize: new google.maps.Size(35, 35), // scaled size
    };
    const location = new google.maps.LatLng(pos.lat, pos.lng);
    const options = {
      center: location,
      zoom: 10,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.map.setCenter(this.position);
    this.map.setZoom(14);
    const marker = new google.maps.Marker({
      position: pos, //marker position
      map: this.map, //map already created
      title: this.tempat,
      icon: icon //custom image
    });

    const contentString = '<h3 id="firstHeading" class="firstHeading">'+this.tempat+'</h3>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 400
    });

    marker.addListener('click', function() {
      infowindow.open(this.map, marker);
    });
    infowindow.open(this.map, marker);
  }

}
