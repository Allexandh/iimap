import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglesitePageRoutingModule } from './googlesite-routing.module';

import { GooglesitePage } from './googlesite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglesitePageRoutingModule
  ],
  declarations: [GooglesitePage]
})
export class GooglesitePageModule {}
