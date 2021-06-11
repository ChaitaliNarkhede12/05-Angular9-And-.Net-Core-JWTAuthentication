import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'employee',
        pathMatch:'full'
      },
      {
        path: 'employee',
        loadChildren: () => import('../home/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'userlist',
        loadChildren: () => import('../home/user/user.module').then(m => m.UserModule)
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
