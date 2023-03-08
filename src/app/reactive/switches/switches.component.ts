import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit{

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [true, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones : true
  }

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: false
    });

    //También nos podemos suscribir a cambios que se hayan hecho en el formulario. Por ejemplo, si queremos un evento que salte cuando se modifica el campo condiciones del formulario tendremos
    // que suscribirnos al valueChanges del campo condiciones del formulario miFormulario.
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(newValue =>{
    //   console.log('Nuevo valor', newValue)
    // })

    this.miFormulario.valueChanges.subscribe(form =>{ //De esta forma le pasamos todo el formulario, y luego borramos con el delete el campo condiciones
      delete form.condiciones;
      this.persona = form;
    })

    this.miFormulario.valueChanges.subscribe(({condiciones, ...rest}) =>{ //De esta forma en vez de pasar el objeto form que engloba toda la info del formulario recupera todo menos el campo condiciones. Asi nos evitamos de traer todo el form y borrar después el campo condiciones
      //delete form.condiciones;
      this.persona = rest;
    })

  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.notificaciones; //Sirve para que no se envíe el valor de condiciones que haya puesto el usuario en el formulario. Es Javascript
    this.persona = formValue;
    //console.log('Form value: ', formValue)
  }
}
