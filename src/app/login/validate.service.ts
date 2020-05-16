export class ValidateService {

    validateUser = (userName:string,password:string)=> {
        if(userName === 'mandip' && password === 'Naggar0'){
            return true;
        }
        return false;
    }
}