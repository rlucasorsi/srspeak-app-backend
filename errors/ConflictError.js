import CustomError from '../errors/CustomError.js';

class ConflictError extends CustomError {
  constructor(message = 'Data conflict') {
    super(409, message); // 409 é o código HTTP para conflito
  }
}

export default ConflictError;
