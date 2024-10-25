export const generateSecurityCode = () => {
  // Gera um número aleatório de 6 dígitos
  const securityCode = Math.floor(100000 + Math.random() * 900000);
  // Converte para string e garante que tenha 6 dígitos
  return securityCode.toString().padStart(6, '0');
};
