import { Pipe, PipeTransform } from '@angular/core';

interface MyElement {
  Nombre: string;
  Apellido: string;
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(e: MyElement): string {
    if (!e || typeof e.Nombre !== 'string' || typeof e.Apellido !== 'string') {
      return "";
    }
    return `${e.Apellido}, ${e.Nombre}`;
  }

}
