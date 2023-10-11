import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { FrontComponent } from './components/front/front.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
const routes: Routes = [
  { path: '', component: FrontComponent},
  { path: 'Udlån', component: CreateItemComponent},
  { path: 'Enhed', component: ItemComponent},
  { path: 'LogInd', component: LoginComponent},
  { path: 'profil', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
