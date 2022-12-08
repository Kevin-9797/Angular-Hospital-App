import { environment } from '../../environments/environment.prod';

const baseUrl = environment.baseUrl;

export class User {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public role?: string,
        public isGoogle?: boolean,
        public img?: string,
        public uid?: string,
    ){}

    get imgUrl () {
        
        if( this.img?.includes('https')){
            return this.img;
        }


        if( this.img ){
            return `${ baseUrl }/upload/users/${ this.img }`
        }else{

            return `${ baseUrl }/assets/images/not_found.jpg`;

        }
    }

}