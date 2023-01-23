import { Hospital } from './hospital.model';


interface _MedicalUser{
    _id: string;
    name: string;
    img: string;

}


export class Medical {

    constructor(
        public _id?: string,
        public  name?: string,
        public img?: string,
        public user?: _MedicalUser,
        public hospital?: Hospital,
    ){}



}