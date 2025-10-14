export const formatPrice = (price) => {
  return `R$ ${Number(price).toFixed(2).replace('.', ',')}`;
};
