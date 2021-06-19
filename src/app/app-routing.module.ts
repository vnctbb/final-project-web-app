import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../app/auth/auth.guard'

import { UserComponent } from '../app/controller/user/user.component'
import { SignUpComponent } from '../app/controller/user/sign-up/sign-up.component'
import { SignInComponent } from '../app/controller/user/sign-in/sign-in.component'
import { UserProfileComponent } from '../app/controller/user-profile/user-profile.component'
import { OtherProfileComponent } from '../app/controller/other-profile/other-profile.component'
import { ListTopicComponent } from '../app/controller/topic/list-topic/list-topic.component'
import { TopicComponent } from '../app/controller/topic/topic/topic.component'
import { HomeComponent } from '../app/controller/home/home.component'
import { SearchResultComponent } from './controller/search-result/search-result.component';
import { SignInAdminComponent } from './controller/user/sign-in-admin/sign-in-admin.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { DashUserComponent } from './controller/dashboard/dash-user/dash-user.component';
import { DashPostComponent } from './controller/dashboard/dash-post/dash-post.component';
import { DashTopicComponent } from './controller/dashboard/dash-topic/dash-topic.component';

const routes: Routes = [
  {
    path : 'signup', component: UserComponent,
    children: [{path : '', component: SignUpComponent}]
  },
  {
    path : 'login', component: UserComponent,
    children: [{path : '', component: SignInComponent}]
  },
  {
    path : 'login/admin', component: SignInAdminComponent
  },
  {
    path : 'dashboard/user', component: DashboardComponent, canActivate:[AuthGuard],
    children: [{path : '', component: DashUserComponent}]
  },
  {
    path : 'dashboard/post', component: DashboardComponent, canActivate:[AuthGuard],
    children: [{path : '', component: DashPostComponent}]
  },
  {
    path : 'dashboard/topic', component: DashboardComponent,
    children: [{path : '', component: DashTopicComponent}]
  },
  {
    path : 'home', component: HomeComponent, canActivate:[AuthGuard]
  },
  {
    path : 'search', component: SearchResultComponent, canActivate:[AuthGuard]
  },
  {
    path : 'profile', component: UserProfileComponent, canActivate:[AuthGuard]
  },
  {
    path : 'user', component: OtherProfileComponent, canActivate:[AuthGuard]
  },
  {
    path : 'topic', component: TopicComponent, canActivate:[AuthGuard]
  },
  {
    path : 'topiclist', component: ListTopicComponent, canActivate:[AuthGuard]
  },
  {
    path : '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path : '**', redirectTo: '/login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
