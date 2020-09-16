/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
