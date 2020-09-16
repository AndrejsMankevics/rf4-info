export const conditionalClass = (
  classes: string[],
  className: string,
  condition: boolean
): string => {
  if (condition) {
    classes.push(className);
  }
  return classes.join(' ');
};
