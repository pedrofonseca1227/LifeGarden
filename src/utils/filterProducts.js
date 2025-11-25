export function filterProducts(produtos, busca, categoria, precoMin, precoMax) {
  return produtos.filter((p) => {
    const nomeMatch = p.nome?.toLowerCase().includes(busca.toLowerCase());
    const descMatch = p.descricao?.toLowerCase().includes(busca.toLowerCase());
    const categoriaMatch =
      categoria === "todos" || p.categoria === categoria;
    const precoMinMatch = precoMin ? p.preco >= parseFloat(precoMin) : true;
    const precoMaxMatch = precoMax ? p.preco <= parseFloat(precoMax) : true;

    return (nomeMatch || descMatch) && categoriaMatch && precoMinMatch && precoMaxMatch;
  });
}
