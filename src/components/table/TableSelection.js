export class TableSelection {
  static CLASS_NAME = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.CLASS_NAME);
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.CLASS_NAME));
    this.group = [];
  }

  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.CLASS_NAME));
  }
}
