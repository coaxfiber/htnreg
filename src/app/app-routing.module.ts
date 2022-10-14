import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './layout/login/login.component';
import { AccessguardGuard } from './_helpers/accessguard.guard';
import { ProfileComponent } from './pages/profile/profile.component';

import { DashboardGuard } from './_helpers/dashboard.guard';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AccessguardGuard],
  },
  
  {
    path: 'profile',
    component: AppLayoutComponent,
    canActivate: [DashboardGuard],
    children:[
      {
        path: '',
        component: ProfileComponent,
      },
      // {
      //   path: '',
      //   component: DashboardComponent,
      // }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }