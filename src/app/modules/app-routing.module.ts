import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeToolHostComponent } from '../components/code-tool-host/code-tool-host.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
{ path: '', pathMatch: 'full', redirectTo: 'editor' },
{ path: 'home', component: HomeComponent },
{ path: 'editor', component: CodeToolHostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }