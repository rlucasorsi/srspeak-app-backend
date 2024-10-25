import bcrypt from 'bcrypt';

const saltRounds = 10; // Número de rounds para o salt, você pode ajustar conforme necessário

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};
