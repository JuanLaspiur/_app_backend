// domain/validators/validators.ts

export class Validators {
  /** Valida fechas en formato YYYY-MM-DD */
  static get date() {
    return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  }

  /** Valida emails */
  static get email() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  /** Valida contraseñas (mínimo 6 caracteres, al menos una letra y un número) */
  static get password() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  }

}
