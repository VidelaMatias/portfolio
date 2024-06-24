//Función de validación de email
export const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!email.trim()) {
      return 'El correo electrónico es obligatorio';
    }
    if (!emailRegex.test(email)) {
      return 'El correo electrónico no tiene un formato válido';
    }
  
    return undefined; 
  };
  
  // Función de validación de contraseña
  export const validatePassword = (password: string): string | undefined => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!password.trim()) {
      return 'La contraseña es obligatoria';
    }
    if (!passwordRegex.test(password)) {
      return 'La contraseña debe tener al menos 6 carácteres, una mayúscula y un dígito.';
    }

    return undefined; 
  };

  export const validateRegisterForm = (field: string, value:string): string | undefined => {
    const phoneRegex = /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    if (!value.trim()) {
      return 'El campo es obligatorio';
    }

    switch (field) {
      case 'email':
        return (validateEmail(value))
        break;
        case 'phone':
          if (!phoneRegex.test(value)) {
            return 'El teléfono no tiene un formato válido';
          }
          break;
        case 'dni':
          if(value.length !== 8){
            return 'El DNI debe tener 8 dígitos'
          }
        break;
        case 'password':
          return (validatePassword(value))
          break;
      default:
        break;
    }
    
  
    return undefined; 
  };
  