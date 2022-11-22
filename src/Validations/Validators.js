import * as EmailValidator from 'email-validator';
const regName = "/^[a-zA-Z]+( [a-zA-Z]+)+$/";

export function isEmpty(value){
    if(value === "" || !value){
        return false;
    }else{
        return true;
    }
}

export function isEmail(value){
    if(EmailValidator.validate(value)){
        return true;
    }else{
        return false;
    }
}

export function isName(value){
    if(!regName.test(value)){
        return false;
    }else{
        return true;
    }
}



