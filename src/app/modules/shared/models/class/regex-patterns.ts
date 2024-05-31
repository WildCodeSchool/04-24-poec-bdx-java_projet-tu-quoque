export class RegexPatterns {
    static emailPattern: string = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    static passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    static textPattern: string = "[a-zA-Z0-9 ]*";
    static datePattern: string = "((?:19|20)\d\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])";
  }