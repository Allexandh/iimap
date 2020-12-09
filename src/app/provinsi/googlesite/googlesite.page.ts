import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProvinsiService} from '../../provinsi.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-googlesite',
  templateUrl: './googlesite.page.html',
  styleUrls: ['./googlesite.page.scss'],
})
export class GooglesitePage implements OnInit {
  id: string;
  link: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private provinsiSrv: ProvinsiService,
      private db: AngularFireDatabase,
      private router: Router
  ) { }

  ngOnInit() {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('provinsi')) {
          return;
        }
        this.id = paramMap.get('provinsi');
      });
  }

}
