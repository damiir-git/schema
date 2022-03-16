type TSubscribers = {
  [key: string]: CallableFunction[];
}

export interface IEventBus {
  subscribe: (name: string, callback: CallableFunction) => void;
  unsubscribe: (name: string, callback: CallableFunction) => void;
  publish: (name: string, ...args: any[]) => void;
}

/**
 * Event Bus
 * Шина событий
 */
class EventBus implements IEventBus {
  private static instance: EventBus;
  private subscribers: TSubscribers = {};

  /**
   * Can't be created via constructor
   * Нельзя создать через конструктор
   * @private
   */
  private constructor() {}

  /**
   * Getting an Instance
   * Получение экзмепляра
   * @return {EventBus} Event Bus (шина события)
   */
  static getInstance(): EventBus {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }

  /**
   * Event subscription
   * Подписка на событие
   * @param {string} name event name (наименование события)
   * @param {Function} callback callback function (функция исполнения)
   */
  subscribe(name: string, callback: CallableFunction) {
    if (!this.subscribers[name]) {
      this.subscribers[name] = [];
    }
    this.subscribers[name].push(callback);
  }

  /**
   * Unsubscribing from an event
   * Отписка от события
   * @param {string} name event name (наименование события)
   * @param {Function} callback callback function (функция отписки)
   */
  unsubscribe(name: string, callback: CallableFunction) {
    const _subscribers = this.subscribers[name];
    const delIndexes = _subscribers.reduce(
        (res, cur, index) => cur === callback ? res.concat(index) : res, [] as number[]
    ).reverse();
    delIndexes.forEach((index) => _subscribers.splice(index, 1));
  }

  /**
   * Publish event
   * Опубликовать событие
   * @param {string} name event name (наименование события)
   * @param {any[]} args arguments (аргументы)
   */
  async publish(name: string, ...args: any[]) {
    await this.subscribers[name]?.forEach((callback) => callback(args));
  }
}

export default EventBus.getInstance();
