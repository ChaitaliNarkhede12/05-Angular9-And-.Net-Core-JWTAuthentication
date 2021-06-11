import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HomeComponent } from '../home/home.component';
import { HomeRoutingModule } from '../../app/home/home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
   ],
  providers: [
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
