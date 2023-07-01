import { IsDate } from 'class-validator';

export class Validator {

  static isString(input: unknown): boolean {
    if( typeof (input) === 'string' ) {
      return true;
    }else {
      return false;
    }
  }

  static isNumber(input: unknown): boolean {
    if ( typeof (input) === 'number') {
      return true;
    }
    return false;
  }

  static isDate(input: string): boolean {
    return true;
  }

  static isEmail(input: string): boolean {
    return false
  }

  static isValidPassword(input: string): boolean {
    if ( input.length < 8 ) 
      return false
    else
      return true
  }

}
