// This will tell TypeScript that when we import a `.module.css` file, 
// it should be treated as a module with a record of strings.
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  