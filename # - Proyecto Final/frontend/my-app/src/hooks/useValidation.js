// Hook personalizado para validaciones comunes
export const useValidation = () => {
  const validateEmail = {
    required: "El email es obligatorio",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Formato de email inválido",
    },
  };

  const validatePassword = {
    required: "La contraseña es obligatoria",
    minLength: {
      value: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  };

  const validateName = {
    required: "El nombre es obligatorio",
    minLength: {
      value: 2,
      message: "El nombre debe tener al menos 2 caracteres",
    },
  };

  const validatePhone = {
    required: "El teléfono es obligatorio",
    pattern: {
      value: /^[\d\s\-\+\(\)]+$/,
      message: "Formato de teléfono inválido",
    },
  };

  const validateConfirmPassword = (password) => ({
    required: "Confirma tu contraseña",
    validate: (value) => value === password || "Las contraseñas no coinciden",
  });

  return {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateConfirmPassword,
  };
};

export default useValidation;
