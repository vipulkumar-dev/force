export const formatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  
  export const commaFormatter = Intl.NumberFormat("en-US", {
    notation: "standard",
  });
  
  export const commaFormatterDecimals = Intl.NumberFormat("en-US", {
    notation: "standard",
    maximumSignificantDigits: 2,
  });
  
  export const commaFormatterDecimals2 = Intl.NumberFormat("en-US", {
    notation: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  export const commaFormatterDecimals6 = Intl.NumberFormat("en-US", {
    notation: "standard",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  
  export const commaFormatterNoDecimals = Intl.NumberFormat("en-US", {
    notation: "standard",
    maximumFractionDigits: 0,
  });
  
  export const moneyFormatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    currency: "USD",
    style: "currency",
    maximumSignificantDigits: 3,
  });
  
  export const percentFormatter = Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "percent",
    maximumFractionDigits: 1,
  });
  
  export const percentFormatterCommas = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  export const compactNumberFormatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "decimal",
    maximumFractionDigits: 1,
  });
  
  export const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  
  export const scientificNotationFormatter = new Intl.NumberFormat("en-US", {
    notation: "scientific",
    maximumFractionDigits: 4,
  });
  
