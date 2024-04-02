export const getInitials = (name: string) =>
  `${name.split("")[0].toUpperCase()}${name.split("")[1].toUpperCase()}`;
