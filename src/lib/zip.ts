const zip = <T>(a: T[], b: T[]) : T[][] =>
  a.length >= b.length ?
    a.map((t: T, i: number) => b[i] !== undefined ? [t, b[i]] : [t]) :
    b.map((t: T, i: number) => a[i] !== undefined ? [a[i], t] : [t])
export default zip
