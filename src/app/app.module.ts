import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RemarksComponent } from './components/remarks/remarks.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { FrontComponent } from './components/front/front.component';
import { ItemComponent } from './components/item/item.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    RemarksComponent,
    UserProfileComponent,
    LoginComponent,
    FrontComponent,
    ItemComponent,
    CreateItemComponent,
    ProfileComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
