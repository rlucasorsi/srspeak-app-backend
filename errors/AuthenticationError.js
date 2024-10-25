// errors/AuthenticationError.js
import CustomError from '../errors/CustomError.js';

class AuthenticationError extends CustomError {
  constructor(message = 'Authentication required') {
    super(401,message); 
  }
}

export default AuthenticationError;
