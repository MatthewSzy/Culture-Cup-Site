import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const formsModule = () => import('src/app/forms/forms.module').then(x => x.FormsModule);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'account', loadChildren: formsModule},

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
