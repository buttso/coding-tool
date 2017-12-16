import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicHostComponent } from '../components/public-host/public-host.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'public/:id', component: PublicHostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }