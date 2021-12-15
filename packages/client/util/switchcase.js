const executeIfFunction = (f) => (typeof f === 'function' ? f() : f)

export const switchcase = (cases) => (defaultCase) => (key) =>
  Object.prototype.hasOwnProperty.call(cases, key) ? cases[key] : defaultCase

export const switchcaseF = (cases) => (defaultCase) => (key) =>
  executeIfFunction(switchcase(cases)(defaultCase)(key))
