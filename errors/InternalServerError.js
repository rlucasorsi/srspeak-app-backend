// errors/InternalServerError.js
import CustomError from '../errors/CustomError.js';

class InternalServerError extends CustomError {
  constructor(message = 'Internal Server Error') {
    super(500, message); // 500 é o código HTTP para erro interno
  }
}

export default InternalServerError;
