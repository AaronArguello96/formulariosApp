import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    //nombre: new FormControl('RTX 4080ti'),
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array([
      ['FFIX', Validators.required],
      ['Howarts Legacy', Validators.required],
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  //De esta forma simplificamos el trabajo con el array de objetos 'favoritos' en el html, creando un get que lo que hace es devolver esos campos del formulario miFormulario como un FormArray
  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private formBuilder: FormBuilder){}

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); //Este metodo sirve para que angular toque todos los campos del formulario, de modo que si presionamos el boton de guardar sin haber tocado nada nos muestre los errores de los campos
      return
    }
    console.log(this.miFormulario.value);
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){
      return;
    }
    //((this.miFormulario.controls['favoritos']) as FormArray).push(this.nuevoFavorito); No funciona, añade el valor al array pero si se modifica en el input de agregar se modifica en el array
    this.favoritosArr.push(new FormControl(this.nuevoFavorito.value, Validators.required));

    this.nuevoFavorito.reset();
  }

  eliminarFavorito(index: number){
    this.favoritosArr.removeAt(index);
    
  }
}
