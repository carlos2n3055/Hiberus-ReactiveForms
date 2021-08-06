import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadoRoutingModule } from './listado-routing.module';
import { ListaComponent } from './lista/lista.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    ListadoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ListaComponent
  ]
})
export class ListadoModule { }
