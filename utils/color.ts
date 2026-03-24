export const switchDarkLightLogo = (hex: string) => {
  if (hex === "#000000") {
    return "#FFFFFF";
  }

  return "#000000";
};

export const switchTextColor = (hex: string) => {
  if (hex === "#000000") {
    return "#FFFFFF";
  }

  return hex;
};

// export const isDarkColor = (hex: string) => {
//   const c = hex.replace("#", "");
//   const r = parseInt(c.substring(0, 2), 16);
//   const g = parseInt(c.substring(2, 4), 16);
//   const b = parseInt(c.substring(4, 6), 16);

//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;

//   // return true if is dark, false otherwise
//   return brightness < 64; // 256 / 4
// };


// export const getContrastHoverColor = (hex: string) => {
//   return isDarkColor(hex) ? "#FFFFFF" : hex;
// };

// export const getHoverStyles = (color: string) => ({
//   backgroundColor: color,
//   color: getContrastHoverColor(color),
//   boxShadow: "0 0 0 2px rgba(255,255,255,0.1)",
//   // boxShadow: `0 0 20px ${color}40`,
// });

// export const getContrastTextColor = (hex: string) => {
//   return isDarkColor(hex) ? "#FFFFFF" : hex;
// };

// export const isDarkColor = (hex: string) => {
//   const c = hex.replace("#", "");
//   const r = parseInt(c.substring(0, 2), 16);
//   const g = parseInt(c.substring(2, 4), 16);
//   const b = parseInt(c.substring(4, 6), 16);

//   const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//   return brightness < 128;
// };

// export const isDarkColor = (hex: string) => {
//   if (hex === "#000000") {
//     return "#FFFFFF";
//   }
// };

// export const getContrastHoverColor = (color: string) => {
//   return;
// };

// export const getSafeHoverColor = (color: string, bg = "#000000") => {
//   const isTooDark = isDarkColor(color);

//   // If theme color is too dark for dark UI, fallback
//   if (isTooDark) {
//     return "#FFFFFF"; // or a lighter fallback like "#d4ff00"
//   }

//   return color;
// };

// export const getContrastTextColor = (hex: string) => {
//   return isDarkColor(hex) ? "#FFFFFF" : hex;
// };

// export const getContractHoverColor = (hex: string) => {
//   return isDarkColor(hex) ? "#FFFFFF" : "#000000";
// };

// export const getHoverStyles = (color: string) => ({
//   backgroundColor: color,
//   color: getContractHoverColor(color),
//   boxShadow: "0 0 0 2px rgba(255,255,255,0.1)",
//   // boxShadow: `0 0 20px ${color}40`,
// });
