export const name = [
  {
    required: true,
    message: 'La nombre es requerido'
  },
  {
    validator: (rule, value, callback) => {
      const alphaNumRegEx = /^[a-zA-Z0-9\u00C0-\u00FF\s]+$/;
      if (!alphaNumRegEx.test(value)) {
        return callback(new Error('Debe indicar un nombre válido'));
      }
      callback();
    },
    trigger: 'blur'
  }
];
export const code = [
  {
    required: true,
    message: 'El código es requerido'
  },
  {
    validator: (rule, value, callback) => {
      const alphaNumRegEx = /^[a-zA-Z0-9-]*$/;
      const whiteSpaceRegEx = /^\S*$/;
      if (!alphaNumRegEx.test(value)) {
        return callback(new Error('Debe indicar un código válido'));
      }
      if (!whiteSpaceRegEx.test(value)) {
        return callback(new Error('Los espacios en blanco no son válidos'));
      }
      callback();
    },
    trigger: 'blur'
  }
];

export const faculty = [
  {
    required: true,
    message: 'Debe seleccionar una facultad'
  }
];
