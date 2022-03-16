/**
 * Функция генерирует идентификатор
 * @param {number} len длина генерируемой строки
 * @param {string} prefix префикс
 * @return {string}
 */
export function genId(len: number, prefix: string = ''): string {
  const array = new Uint32Array(len);
  return crypto.getRandomValues(array).reduce((prev, curr) => `${prev}${!!prev ? '-' : ''}${curr.toString(16)}`, prefix);
}
