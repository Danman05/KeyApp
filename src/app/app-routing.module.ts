import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { FrontComponent } from './components/front/front.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: FrontComponent},
  { path: 'udlån', component: CreateItemComponent},
  { path: 'enhed/:id', component: ItemComponent},
  { path: 'log-ind', component: LoginComponent},
  { path: 'register', component: SignupComponent},
  { path: 'profil', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
