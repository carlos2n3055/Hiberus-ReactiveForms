import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SecretComponent } from './secret/secret.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptorService } from './auth-interceptor.service';

//Aqui como con los formularios normales, debemos importar el ReactiveFormsModule, para
//poder usar los formularios reactivos
@NgModule({
  declarations: [
    RegistroComponent,
    SecretComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //vamos a usar aqui tambien el array de providers, en este caso lo usaremos para definir
  //el interceptor de las llamadas de nuestr aplicacion
  providers: [
    {
      //Lo primero es indicar el provide, en este caso es el HTTP Interceptors
      provide: HTTP_INTERCEPTORS,
      //Le indicamos que clase debe usar para hacer la intercepcion
      //en nuestro caso usaremos nuestro servicio
      useClass: AuthInterceptorService,
      //Nos permite definir si podemos tener multiples instancias del interceptor
      //Es decir s ise comporta como un singleton o no
      multi:true
    }
  ]
})
export class UsuariosModule { }
