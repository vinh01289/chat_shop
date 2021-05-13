import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from './home/chat/conversation/conversation.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', pathMatch : 'full', redirectTo: '/shop' },
  // { 
  //   path: 'login',
  //   loadChildren: () => import('./login/login.module').then(m=>m.LoginModule),
  // },
  {
    path: 'shop',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
  },
  {path: 'shop',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      { path:'login', component:LoginComponent},
      { path: 'home', component: HomeComponent },
      { path: 'conversation', component: ConversationComponent},
    ],
  },
  // { path: 'customer',
  //   canActivate: [AuthloginService],
  //   component: HomeComponent,
  //   children: [
  //     {path: 'login', component: LoginComponent},
  //     { path: 'home', component: HomeComponent},
  //     { path:'conversation', component: ConversationComponent},
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
