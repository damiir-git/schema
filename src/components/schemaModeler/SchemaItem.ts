import {SchemaItemStates} from '../schemaRenderer/types';
import {genId} from '../../common/genId';
import {ElementType, TModelElement} from '../model/ModelElement';

interface ISchemaItem<T extends ElementType> {
  id: string;
  modelElement: TModelElement<T>;
  states: Set<SchemaItemStates>;
  addState(state: SchemaItemStates): void;
  deleteState(state: SchemaItemStates): void;
  hasState(state: SchemaItemStates): void;
}

/**
 * Schema element
 * Элемент схемы
 */
export default class SchemaItem<T extends ElementType> implements ISchemaItem<T> {
  id: string;
  modelElement: TModelElement<T>;
  states: Set<SchemaItemStates>;

  /**
   * Constructor
   * Конструктор
   * @param modelElement model element (элемент модели)
   */
  constructor(modelElement: TModelElement<T>) {
    this.id = genId(2, 'svg-element');
    this.states = new Set<SchemaItemStates>();
    this.modelElement = modelElement;
  }

  /**
   * Method for add state to schema element
   * Метод добавления состояния элемента схемы
   * @param state state (состояние)
   */
  addState(state: SchemaItemStates) {
    this.states.add(state);
  }

  /**
   * Method for delete state from schema element
   * Метод удаления состояния элемента схемы
   * @param state state (состояние)
   */
  deleteState(state: SchemaItemStates) {
    this.states.delete(state);
  }

  /**
   * Method for check state in schema element
   * Метод проверки наличия состояния элемента схемы
   * @param state state (состояние)
   * @return {boolean} result результат
   */
  hasState(state: SchemaItemStates): boolean {
    return this.states.has(state);
  }

  transform(x: number, y: number) {
    this.modelElement.transform.x = x;
    this.modelElement.transform.y = y;
  }
}
