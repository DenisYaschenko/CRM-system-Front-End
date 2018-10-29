import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutsComponent } from './shared/layouts/site-layouts/site-layouts.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutsComponent, canActivate: [AuthGuard], children: [
            {path: 'overview', component: OverviewPageComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
