import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona{
  nombre:string;
  favoritos: Favorito[];
}

interface Favorito{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {

  @ViewChild('formulario') formulario!: NgForm;

  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Pepe',
    favoritos:[
      {id: 1,
      nombre: 'FFIX'},
      {
        id: 2,
        nombre: 'Howarts Legacy'
      }
    ]
  }

  guardar(){

    console.log('Nombre: ', this.formulario?.controls['nombre'].value);
    console.log('Juego', this.formulario.controls['juego'].value)
    console.log('Guardado');
  }

  eliminar(index:number){
    this.persona.favoritos.splice(index, 1);
  }

  agregar(){
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length+1,
      nombre: this.nuevoJuego
    }
    //this.persona.favoritos.push(nuevoFavorito);
    this.persona.favoritos.push({...nuevoFavorito}); //Lo mandamos como un nuevo objeto con el operador Spread
    this.nuevoJuego = '';
  }

  // validarNombre():boolean{
  //   return this.formulario?.controls['nombre']?.invalid;
  // }
}
