import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Debemos crear una configuracion para el formulario reactivo, una configuracion
  //es definir que campos y tipos vamos a tener en nuestro formulario.
  //Primero crear una variable para los campos que vamos a crear
  //el tipo FormGroup nos permite definir que campos tendremos
  public formGroup: FormGroup;
  public datosWS: any = null;
  //Para trabajar con los formularios reactivos, debemos inyectarlos en el constructor
  //En este caso debemos inyectar el formBuilder
  //Esta clase es la encargada de crear los formularios reactivos
  //Tambien inyectamos el httpClient para poder lanzar peticiones a WS
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    //inicializamos el formGroup
    //por eso le ponemos {} vacios como argumento a la hora de instanciarlo
    this.formGroup = this.formBuilder.group({});
  }

  //Normalmente para inicializar el formBuilder y que no este vacio se suele crear un metodo
  //donde le indiquemos que campos va a tener el formulario y que condiciones le queremos poner
  private buildForm() {
    let nombre = "Jhon";
    //para crear campos en el formulario se configuran mediante el uso de JSON, es muy
    //parecido a la creacion de un interfaz
    this.formGroup = this.formBuilder.group({
      username: ["jhon@rambo.com", [
        Validators.required,
        Validators.email
      ]],
      //Los Validators nos permiten meter que condiciones deben cumplir los campos,
      //Podemos poner varios encadenados usando [], para indicar que son una lista de validadores
      name: [nombre, Validators.required],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        //Aqui pasamos el puntero al metodo, por una invocacion, por consiguiente no lleva ()
        this.validatePassword
      ]]
    });
  }

  //Para crear nuestros propios validadores son como metodos normales
  //la diferencia es que recibe como parametro un AbsctractControl
  //Esta variable nos permite recuperar los datos del control que vamos a validar
  private validatePassword(control: AbstractControl) {
    let error = {};
    //Empezamos por recuperar el valor del control que estara en el atributo value
    const password = control.value;
    //Una vez que tengo el valor puedo poner las condiciones que me interesen
    if (!password.includes("%")) { //Aqui le indicamos que el password como minimo debe incluir un %
      //esto se ejecutara si no lo incluye y desencadenaremos un error
      error = {
        ...error,
        porcentaje: "Se debe incluir un %"
      };
    }
    //vamos a poner otra condicion mas
    if (!parseFloat(password[password.length - 1])) { //comprobamos que acabe por un numero
      error = {
        ...error,
        numero: "Debe finalizar con un numero"
      }

    }
    return error;
  }

  //Vamos a crear un metodo para cuando el usuario hace click en registrar que es donde tendremos
  //los valores de los campos
  public registro() {
    // let urlApi = 'https://api.exchangerate.host/latest';
    let urlApi = 'https://lldev.thespacedevs.com/2.0.0/launch/jlhj/' //esto devuelve un error 500
    //Vamos a recuperar los valores del formulario, esto se hace con el atributo value del fromGroup
    let datos = this.formGroup.value;
    console.log(datos);
    this.httpClient.get(urlApi).subscribe(apiData => (this.datosWS = apiData));
  }

  //Vamos  a crear un metodo para indicar el error al usuario en caso de que el formulario no sea valido
  public getError(controlName: string): string {
    let error = "";
    //para ver si hay un error lo primero es recuperar el control, con el get del formGroup
    //nos permite recuperarlo, se parece al document.getElementById de JS
    const control = this.formGroup.get(controlName);
    //Lo que debemos hacer el comprobar el estado del control
    //Si esta condicion se cumple significa que el campo ha sido modificado y que ademas tiene errores
    if (control?.touched && control.errors != null) { //Aqui meteriamos los errores personalizados
      //Esto devuelve el objeto error, lo convertimos en JSON para ver su estructura
      error = JSON.stringify(control.errors);
    }
    return error;
  }


  ngOnInit(): void {
    //Una vez inyectada para que funcione la creacion de formulario, precisamos iniciarlo
    //en el init del componente e invocamos a la inicializacion de los campos del formulario
    this.buildForm();
  }

}
