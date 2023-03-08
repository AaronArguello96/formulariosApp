import { Directive, Input } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector: '[customMin] [ngModel]', //En el selector indicamos que elementos del input del html son necesarios para que funcione la directiva
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CustomMinDirective,
        multi: true
    }]
})
export class CustomMinDirective implements Validator{
    @Input() minimo!: number;

    constructor(){
        // console.log('Directiva: ', this.minimo)
    }
    validate(control: FormControl){
        const inputValue = control.value;
        // console.log('Valor input', inputValue);
        // console.log('Minimo', this.minimo)

        return (inputValue<this.minimo)
                ?{'customMin': true}
                : null;
    }
}