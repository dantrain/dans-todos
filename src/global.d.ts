// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
