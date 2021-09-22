import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/guard/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: 'edit',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/notes/edit/edit.module').then((m) => m.EditModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/notes/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'login',
    canActivate: [SecureInnerPagesGuard],
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [SecureInnerPagesGuard],
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
