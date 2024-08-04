export const getInitials = (firstName: string, lastName: string) => {
  return firstName && lastName
    ? `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`
    : null;
};
