import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {

  @ViewChild('miFormulario') miFormulario!: NgForm; //ViewChild sirve para traer un elemento con referencia local del html. De esta forma traemos la información introducida en el formulario por el usuario
  
  initialForm = { //Creamos un objeto que contendrá los valores iniciales del formulario, y en el html los meteremos a través de [ngModel]
    producto: 'RTX 4080TI',
    precio: 0,
    existencias: 10
  }

  guardar() {
    //console.log('Formulario', this.miFormulario)
    console.log('Posteo correcto');
    this.miFormulario.resetForm({ //Se le puede definir el objeto que cargará cuando resetee el formulario.
      producto: 'Algo',
      precio: 0,
      existencias: 0
    });
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls['precio']?.touched && this.miFormulario?.controls['precio']?.value<0;
  }
  
}
