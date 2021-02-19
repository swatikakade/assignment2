export interface Theme {
    name: string;
    properties: any;
  }
  
  export const light: Theme = {
    name: "light",
    properties: {
      "--foreground-default": "#08090A",
      "--foreground-secondary": "#41474D",
      "--foreground-tertiary": "#797C80",
      "--foreground-quaternary": "#F4FAFF",
      "--foreground-light": "#41474D",
  
      "--background-default": "#f2f4f8",
      "--background-secondary": "#A3B9CC",
      "--background-tertiary": "#047bf8",
      "--background-light": "#FFFFFF",
  
      "--primary-default": "#5DFDCB",
      "--primary-dark": "#24B286",
      "--primary-light": "#ffffff",
  
      "--error-default": "#EF3E36",
      "--error-dark": "#800600",
      "--error-light": "#FFCECC",

      "--btn-default": "#047bf8",
      "--panel-default": "#f8f9fa",
      "--border-default": "#8e7c7c",
      "--modal-default": "#ffffff",
      "--text-default": "#000000",
      "--input-default": "#ffffff",
      "--input-text-default": "#000",
      "--input-border-default": "rgba(18,22,41,0.34)",
      "--input-bg-default": "#fff",

      "--background-tertiary-shadow": "0 1px 3px 0 rgba(92, 125, 153, 0.5)"
    }
  };
  
  export const dark: Theme = {
    name: "dark",
    properties: {
      "--foreground-default": "#5C7D99",
      "--foreground-secondary": "#A3B9CC",
      "--foreground-tertiary": "#F4FAFF",
      "--foreground-quaternary": "#E5E5E5",
      "--foreground-light": "#FFFFFF",
  
      "--background-default": "#323c58",
      "--background-secondary": "#41474D",
      "--background-tertiary": "rgba(18,22,41,0.22)",
      "--background-light": "#41474D",
  
      "--primary-default": "#5DFDCB",
      "--primary-dark": "#24B286",
      "--primary-light": "#B2FFE7",
  
      "--error-default": "#EF3E36",
      "--error-dark": "#800600",
      "--error-light": "#ffffff",

      "--btn-default": "rgba(0,0,0,0.15)",
      "--panel-default": "#323c58",
      "--border-default": "#000000",
      "--modal-default": "#323c58",
      "--text-default": "#FFFFFF",
      "--input-default": "rgba(18,22,41,0.22)",
      "--input-text-default": "#ccd9e8",
      "--input-border-default": "rgba(18,22,41,0.34)",
      "--input-bg-default": "rgba(18,22,41,0.22)",
      
      "--background-tertiary-shadow": "0 1px 3px 0 rgba(8, 9, 10, 0.5)"
    }
  };