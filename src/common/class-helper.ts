import { SupportedClassName } from '@dojo/framework/core/interfaces';

export function createClassArray(
  ...classes: Array<
    | {
        [className: string]: string | boolean | undefined | null;
      }
    | SupportedClassName
    | SupportedClassName[]
  >
): string[] {
  return classes.reduce<string[]>((classArray, classesOrClassObj) => {
    const classesToAdd: string[] = [];
    if (typeof classesOrClassObj === 'string') {
      if (classesOrClassObj) {
        classesToAdd.push(classesOrClassObj);
      }
    } else if (Array.isArray(classesOrClassObj)) {
      classesToAdd.push(...createClassArray(...classesOrClassObj));
    } else if (typeof classesOrClassObj !== 'boolean' && classesOrClassObj != null) {
      Object.keys(classesOrClassObj).forEach((className) => {
        const classValue = classesOrClassObj[className];
        if (typeof classValue === 'string') {
          classesToAdd.push(classValue);
        } else if (classValue) {
          classesToAdd.push(className);
        }
      });
    }

    return [...classArray, ...classesToAdd];
  }, [] as string[]);
}
