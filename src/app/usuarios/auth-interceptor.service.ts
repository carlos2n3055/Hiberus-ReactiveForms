import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//Estos servicios deben implementar obligatoriamente el interfaz definido en HttpInterceptor
export class AuthInterceptorService implements HttpInterceptor {
  //El primer metodo obligatorio es el intercept, como estamos procesaondo la intercepcion
  //de las peticiones, lo que recibe el intercept es la request desde donde se hace la
  //peticion y que estamos interceptando,
  //y tambien un puntero al siguiente manejador, esto se debe a que podemos tener multiples
  //peticiones, y una vez procesada esta le debemos indicar que pase al siguiente manejador
  //Por eso tenemos este puntero next al siguiente handler de las peticiones

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Vamos a empezar por el ejemplo mas basico que es capturar todos los errores de peticiones
    //por ejemplo si el servidor nos devuelve un 401, significaria que el usuario no está
    //autorizado para ver la pagina, si nos da ese error queremos llevar al usuario a la pagina
    //de registrarse.
    return next.handle(req).pipe(
      //ojo cone l bind, que es para evitar que pierda la referencia al puntero this
      //ya vimos en el pasado que esto pasa en JS y es un problema
      //ponemos un tap para ver el objeto de la response, aqui podemos no solo gestionar errores
      //sino que podriamos poner un log de todas las peticiones
      // tap(datos => console.log(datos)),
      catchError(this.handleError.bind(this))
    );
  }

  //el manejador del error lo movemos a un metodo separado
  private handleError(error: any) {
    const codigo = 401;
    //Primero nos aseguramos que es un error de Http, porque podria entrar en este manejador
    //con otro tipo de errores, en este caso solo me estoy centrando en los errores que se pueden
    //dar en las peticiones
    if (error instanceof HttpErrorResponse) {
      //ahora compruebo el codigo de error, en este caso comparamos contra el 401
      if (error.status == codigo) {
        //si este error sucede queremos llevar al usuario a la pagina de registro
        //para la navegacion, el objeto route tiene un metodo navigate que nos permite
        //forzar la navegacion a una url de nuestra aplicacion
        this.route.navigate(["usuarios/registro"]);
      }
      if (error.status == 500) {
        console.log("Error 500");
        console.log(error)
      }
    }
    //siempre debemos devolver algo, en este caso hacemos un throw de error
    //esto se hace como para las peticiones, podemos llegar a tener varios manejadores de errores
    //y hacemos el throw para que continue el flujo
    return throwError(error);
  }
  //Para poder modificar las rutas debemos traernos a traves de la inyeccion de dependencias
  //Un objeto del tipo Router
  constructor(private route: Router) { }
}
