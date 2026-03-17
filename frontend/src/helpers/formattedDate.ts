export const formattedDate = (date?: string) => {
  if (!date) return "";
  const d = new Date(date); // Data que arriba des de data
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0"); // getMonth per defecte comença des de 0. Per tant hem de sumar 1.
  // padStart serveix per afegir un 0 al inici en cas de que el número tingui menys de dos caràcters. Març (3) -> 03.
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
