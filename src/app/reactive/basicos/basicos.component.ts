import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(200),
  // });

  //El formBuilder sirve para hacer la declaración de los elementos del FormGroup de una forma más sencilla. Se declara el valor de los campos del objeto con un array porque se pueden hacer validaciones y validaciones asincronas de esa variable
  miFormulario: FormGroup = this.formBuilder.group({
    //nombre: new FormControl('RTX 4080ti'),
    nombre: [, [Validators.required, Validators.minLength(3)]], //Primero viene el valor por defecto, después los validadores sincronos y por último los asíncronos. Si queremos poner más de un validador sincrono los englobamos entre []
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.miFormulario.setValue({ //El setValue sirve para establecer un valor a los campos del formulario. La pega que tiene es que se tiene que indicar el valor de todos los campos del objeto del formulario, si falta alguno va a petar. Por eso es mejor reset
      nombre: 'RTX3080',
      precio: 200,
      existencias: 10
    })
    this.miFormulario.reset({ //Con reset no hay porque indicarle el valor de todos las variables del objeto
      nombre: 'RTX3080',
      precio: 200,
    })
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //Este metodo sirve para que angular toque todos los campos del formulario, de modo que si presionamos el boton de guardar sin haber tocado nada nos muestre los errores de los campos
      return
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset(); //Reestablece los valores por defecto del formulario
  }
}
