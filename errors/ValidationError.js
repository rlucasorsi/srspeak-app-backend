import CustomError from '../errors/CustomError.js';

class ValidationError extends CustomError {
  constructor(message = 'Validation error') {
    super(400, message); // 400 é o código HTTP para erro de validação
  }
}

export default ValidationError;
