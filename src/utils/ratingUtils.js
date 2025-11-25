/**
 * Calcula a média das avaliações
 * @param {number[]} notas - Array com avaliações de 1 a 5
 * @returns {number} média arredondada para 1 casa decimal
 */
export function calcularMediaAvaliacoes(notas) {
  if (!Array.isArray(notas) || notas.length === 0) return 0;

  const soma = notas.reduce((acc, n) => acc + n, 0);
  return Number((soma / notas.length).toFixed(1));
}

/**
 * Converte uma nota em um array de estrelas (★ e ☆)
 * @param {number} nota - número entre 0 e 5
 */
export function gerarEstrelas(nota) {
  if (nota < 0) nota = 0;
  if (nota > 5) nota = 5;

  const cheias = Math.floor(nota);
  const vazias = 5 - cheias;

  return "★".repeat(cheias) + "☆".repeat(vazias);
}
