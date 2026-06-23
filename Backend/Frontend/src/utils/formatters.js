function fmtNum(n) {
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(".0", "") + "k";
  return String(n);
}
export {
  fmtNum
};
