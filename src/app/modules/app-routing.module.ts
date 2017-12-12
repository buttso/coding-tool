import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeToolHostComponent } from '../components/code-tool-host/code-tool-host.component';
import { MatchListComponent } from '../components/match-list/match-list.component';
import { PublicHostComponent } from '../components/public-host/public-host.component';
import { ButtonListComponent } from '../components/button-list/button-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: MatchListComponent },
  { path: 'buttons', component: ButtonListComponent },
  { path: 'editor/:id', component: CodeToolHostComponent },
  { path: 'public/:id', component: PublicHostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }