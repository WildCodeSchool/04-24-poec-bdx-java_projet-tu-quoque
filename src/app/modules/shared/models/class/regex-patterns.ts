export class RegexPatterns {
    static emailPattern: string = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    static passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    static textPattern: string = "[a-zA-Z0-9 ]*";
  }