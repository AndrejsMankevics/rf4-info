export const conditionalClass = (classes: string, className: string, condition: boolean): string => {
  return condition ? classes.split(' ').concat(className).join(' ') : classes;
};
