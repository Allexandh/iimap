import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvinsiPage } from './provinsi.page';

const routes: Routes = [
  {
    path: '',
    component: ProvinsiPage
  },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  },  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'googlesite',
    loadChildren: () => import('./googlesite/googlesite.module').then( m => m.GooglesitePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvinsiPageRoutingModule {}
