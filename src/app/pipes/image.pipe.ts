import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, type: 'users'| 'medicals' | 'hospitals' ): string {

    if( !img ){
      return `assets/images/avatar_image.jpg`
    }else{
      return img
    }
  }

}
