export default class Enum {
  static getLabels(): Record<string, string> {
    return {};
  }

  static getKeys() {
    return Object.keys(this.getLabels());
  }

  static getLabel(id: string) {
    return this.getLabels()[id] || '';
  }

  static getItems() {
    return Object.entries(this.getLabels()).map(([id, label]) => ({
      label,
      id,
    }));
  }
}
