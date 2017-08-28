import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './frames/welcome/welcome.component';
import { ListComponent } from './home/article/list/list.component';
import { DetailsComponent } from './home/article/details/details.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/home/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
