import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { SecretComponent } from './secret/secret.component';

const routes: Routes = [
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'secretos',
    component: SecretComponent
  },
  {
    path: '**',
    redirectTo: 'registro'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
