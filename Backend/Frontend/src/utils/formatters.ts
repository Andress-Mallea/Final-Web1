export function fmtNum(n: number): string {
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(".0", "") + "k";
  return String(n);
}
