const {
  isValidEmail,
  isValidPassword,
  mxnToUsd,
  usdToMxn,
  eurToGbp,
  jpyToCad,
  jpyToMxn,
  cadToEur
} = require('./utils');

// ====== Conversión de Divisas ======
 test('Convierte 100 MXN a 4.99 USD', () => {
   expect(mxnToUsd(100)).toBeCloseTo(4.99, 2);
 });

 test('Convierte 1 USD a 20.05 MXN', () => {
   expect(usdToMxn(1)).toBeCloseTo(20.05, 2);
 });

test('Convierte 800 EUR a 680 GBP', () => {
expect(eurToGbp(800)).toBeCloseTo(680.0, 1);
});

 test('Convierte 1000 JPY a 9.00 CAD', () => {
   expect(jpyToCad(1000)).toBeCloseTo(9.0, 1);
 });

 test('Convierte 1500 JPY a 195 MXN', () => {
  expect(jpyToMxn(1500)).toBeCloseTo(195.0, 1);
 });


 test('Convierte 100 CAD a 68 EUR', () => {
   expect(cadToEur(100)).toBeCloseTo(68.0, 1);
 });

// ====== Validación de Correo Electrónico ======
 test('Correo válido: usuario@correo.com', () => {
   expect(isValidEmail('usuario@correo.com')).toBe(true);
 });

 test('Correo inválido (sin @): usuariocorreo.com', () => {
   expect(isValidEmail('usuariocorreo.com')).toBe(false);
 });

 test('Correo inválido (sin extensión): usuario@correo', () => {
   expect(isValidEmail('usuario@correo')).toBe(false);
 });

 test('Correo inválido (extensión no válida): usuario@correo.xyz', () => {
   expect(isValidEmail('usuario@correo.xyz')).toBe(false);
 });

// ====== Validación de Contraseña ======
 test('Contraseña válida: Password1!', () => {
   expect(isValidPassword('Password1!')).toBe(true);
 });

 test('Contraseña inválida sin mayúscula: password1!', () => {
   expect(isValidPassword('password1!')).toBe(false);
 });

 test('Contraseña inválida sin número: Password!', () => {
   expect(isValidPassword('Password!')).toBe(false);
 });

 test('Contraseña inválida sin carácter especial: Password1', () => {
 expect(isValidPassword('Password1')).toBe(false);
 });

 test('Contraseña inválida con menos de 8 caracteres: P1!a', () => {
   expect(isValidPassword('P1!a')).toBe(false);
 });


