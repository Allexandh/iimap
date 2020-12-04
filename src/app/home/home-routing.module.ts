import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from '../profile/profile.page';
import { HomePage } from './home.page';

const routes: Routes = [
  // {
  //   path: 'tabs',
  //   component: HomePage,
  //   children: [
  //     {
  //       path: "home",
  //       // redirectTo: 'home',
  //       loadChildren : () => import('./home.module').then(m => m.HomePageModule)
  //     },
  //     {
  //       path: "home/profile",
  //       redirectTo: '/profile',
  //       // component: ProfilePage,
  //       loadChildren : () => import('../profile/profile.module').then(m => m.ProfilePageModule)
  //     }
  //   ]
  // },
  {
    path: '',
    redirectTo: '',
    component: HomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
