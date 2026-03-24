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
