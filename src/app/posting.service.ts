import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Posting} from './posting';

@Injectable({
  providedIn: 'root'
})
export class PostingService {
  private dbPath = '/posting';
  postingRef: AngularFireList<Posting> = null;

  constructor(private db: AngularFireDatabase) {
    this.postingRef = db.list(this.dbPath);
   }

   getAll(): AngularFireList<Posting> {
     return this.postingRef;
   }

   create(posting: Posting): any {
     return this.postingRef.push(posting);
   }

  //  getOne() {
   
  //  }
}
