import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeToolHostComponent } from '../components/code-tool-host/code-tool-host.component';
import { MatchListComponent } from '../components/match-list/match-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: 'list', component: MatchListComponent },
  { path: 'editor', component: CodeToolHostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }