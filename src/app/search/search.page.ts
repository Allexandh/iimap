import { Component, OnInit } from '@angular/core';
import {ProvinsiService} from '../provinsi.service';
import {map} from 'rxjs/operators';
import {getStringInitializerFromProperty} from 'codelyzer/util/astQuery';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  datas: any[];
  datas2: any[];
  constructor(
      private provinsiSrv: ProvinsiService
  ) {}


  ngOnInit() {
    this.provinsiSrv.getAll().snapshotChanges().pipe(
        map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val()}))
        )
    ).subscribe(data => {
      this.datas2 = data;
      this.datas = data;
    });
  }
  filterList(evt){
    this.datas = this.datas2;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.datas = this.datas.filter(currentData => {
      if (searchTerm) {
        return (currentData.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            || currentData.makanan.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
            || currentData.lagu.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
}
