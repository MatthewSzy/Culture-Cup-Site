import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const accountModule = () => import('src/app/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'account', loadChildren: accountModule},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
