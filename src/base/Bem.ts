type TModifiers = Record<string, string | boolean | undefined> | string | null;

export default class Bem {
  constructor(
    private blockName: string,
    private elementSeparator = '__',
    private modifierSeparator = '_',
    private classNameSeparator = ' ',
  ) {}

  public classNames(classNames: Array<string | undefined>) {
    return classNames
      .filter((className) => className)
      .join(this.classNameSeparator);
  }

  public block(modifiers: TModifiers = null) {
    return this.applyModifiers(this.blockName, modifiers);
  }

  public element(elementName: string, modifiers: TModifiers = null) {
    return this.applyModifiers(this.blockName + this.elementSeparator + elementName, modifiers);
  }

  private applyModifiers(entity: string, modifiers: TModifiers) {
    const result = [];
    result.push(entity);

    if (typeof modifiers === 'string' && modifiers) {
      result.push(entity + this.modifierSeparator + modifiers);
    } else if (modifiers) {
      for (const [key, value] of Object.entries(modifiers)) {
        if (!value) {
          continue;
        }

        if (value === true) {
          result.push(entity + this.modifierSeparator + key);
          continue;
        }

        result.push(entity + this.modifierSeparator + key + this.modifierSeparator + value);
      }
    }

    return result.join(this.classNameSeparator);
  }
}
