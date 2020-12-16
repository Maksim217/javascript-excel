import { DomListener } from './DOMListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];
    this.prepare();
  }

  // настройка компонента до init
  prepare() {}

  // Инициализация компонента
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Сюда приходят изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Удаляем компонент
  // Чистим слушателей
  remove() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }

  // Возвращаем шаблон компонента
  toHTML() {
    return ``;
  }
}
