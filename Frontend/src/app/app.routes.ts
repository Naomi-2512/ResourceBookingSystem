import { Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserResourcesComponent } from './components/user/user-resources/user-resources.component';
import { UserBookedComponent } from './components/user/user-booked/user-booked.component';
import { UserLogoutComponent } from './components/user/user-logout/user-logout.component';
import { UserChatComponent } from './components/user/user-chat/user-chat.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {path: '' , component:LandingpageComponent},
    {path: 'register' , component:RegisterComponent},
    {path: 'login' , component:LoginComponent},
    {path: 'user', component:UserComponent , children: [
        {path: 'profile', component: UserProfileComponent},
        {path: 'resources', component: UserResourcesComponent},
        {path: 'booked', component: UserBookedComponent},
        {path: 'chat', component: UserChatComponent},
        {path: 'logout', component: UserLogoutComponent},
        {path: '', redirectTo: 'resources',pathMatch: 'full'}
    ]},
    {path: 'admin' , component:AdminComponent}
];
