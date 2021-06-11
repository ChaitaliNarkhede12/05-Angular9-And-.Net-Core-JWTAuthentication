import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../app/login/login.component';

import { AuthGuard } from '../app/helper/auth.guard';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
  {
    path: 'home',
    loadChildren: () => import('../app/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
