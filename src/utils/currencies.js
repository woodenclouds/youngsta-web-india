const country = "IN";

const IN = {
    symbol: "₹",
    name: "India",
    symbol_native: "₹",
    code: "INR",
    name_plural: "indian rupee",
};

const US = {
    symbol: "$",
    name: "US",
    symbol_native: "$",
    code: "DOL",
    name_plural: "dollar",
};

const currentCountry = country === "US" ? US : IN;
export const countryData = currentCountry;
