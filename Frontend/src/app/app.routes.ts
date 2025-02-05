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
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdminResourcesComponent } from './components/admin/admin-resources/admin-resources.component';
import { AdminBookingsComponent } from './components/admin/admin-bookings/admin-bookings.component';
import { AdminChatComponent } from './components/admin/admin-chat/admin-chat.component';
import { AdminLogoutComponent } from './components/admin/admin-logout/admin-logout.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminDasboardComponent } from './components/admin/admin-dasboard/admin-dasboard.component';

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
    {path: 'admin' , component:AdminComponent , children: [
        {path: 'profile', component: AdminProfileComponent},
        {path: 'resources', component: AdminResourcesComponent},
        {path: 'booked', component: AdminBookingsComponent},
        {path: 'chat', component: AdminChatComponent},
        {path: 'logout', component: AdminLogoutComponent},
        {path: 'users', component: AdminUsersComponent},
        {path: 'dashboard', component: AdminDasboardComponent},
        {path: '', redirectTo: 'dashboard',pathMatch: 'full'}
    ]}
];
