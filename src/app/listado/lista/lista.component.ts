import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Contacto {
  name: string,
  genero: string,
  vip: boolean,
  estadoLaboral: number | string,
  empresa: string
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

  public formGroup: FormGroup;

  encabezado = "Lista de Contactos";
  descripcion = "Ejemplo de utilizacion de formularios";
  numeroContactos = 0;
  formHidden = false;
  editando = false;
  seleccionado: Contacto;

  estadosLaborales = [
    { id: 0, descripcion: "desconocido" },
    { id: 1, descripcion: "desempleado" },
    { id: 2, descripcion: "trabajando" },
    { id: 3, descripcion: "estudiando" }
  ]

  datosFormularioContacto: Contacto;

  listaContactos: Contacto[] = [];
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({});

    this.datosFormularioContacto = {
      name: '',
      genero: '',
      vip: false,
      estadoLaboral: 0,
      empresa: ''
    };

    this.seleccionado = {
      name: '',
      genero: '',
      vip: false,
      estadoLaboral: 0,
      empresa: ''
    }

  }

  public getError(controlName: string): string {
    let error = "";
    //para ver si hay un error lo primero es recuperar el control, con el get del formgroup
    //nos permite recuperarlo, se parece al document.getElementById de JavaScript
    const control = this.formGroup.get(controlName);
    //lo que debemos hacer es comprobar el estado del control
    //si esta condicion se cumple signifca que el campo ha sido modificado y que ademas
    //tiene errores
    if (control?.touched && control.errors != null) {
      //esto devuelve el objeto error, lo convertimos en JSON para ver su estructura
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  guardarContacto() {
    let datos = this.formGroup.value;
    console.log(datos);
    if (this.editando == false) {
      this.listaContactos.push({ ...datos });
      this.actulizarContador();
    }
    else {
      this.borrarContacto(this.seleccionado);
      this.listaContactos.push({ ...datos });
      this.actulizarContador();
    }
  }

  descartarCambios() {
    //indicamos que dehamos de editar
    this.editando = false;

    //ponemos los valores a vacio de datos formulario contacto
    this.formGroup = this.formBuilder.group({
      name: "",
      vip: "",
      estadoLaboral: "",
      empresa: "",
      genero: ""
    });
  }

  nuevoContacto() {
    this.descartarCambios();
  }

  actulizarContador() {
    this.numeroContactos = this.listaContactos.length;
  }

  borrarContacto(contacto: Contacto) {
    this.listaContactos = this.listaContactos.filter(c => c !== contacto);
    this.actulizarContador();
    this.editando = false;
  }

  editarContacto(contacto: Contacto) {
    this.datosFormularioContacto = contacto;

    //ponemos los valores a vacio de datos formulario contacto
    this.formGroup = this.formBuilder.group({
      name: contacto.name,
      vip: contacto.vip,
      estadoLaboral: contacto.estadoLaboral,
      empresa: contacto.estadoLaboral,
      genero: contacto.genero
    });

    this.editando = true;
    this.seleccionado = contacto;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {

    //para crear campos en el formulario se configuran mediante el uso de JSON, es
    //muy parecido a la creacion de un interfaz
    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
      vip: "",
      estadoLaboral: "",
      empresa: "",
      genero: ""
    });
  }
}
