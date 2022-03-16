
import cloneDeep from 'lodash/cloneDeep';
import SchemaItem from './SchemaItem';
import {ElementType, TModel} from '../model/ModelElement';

export interface ISchema {
  schemaModel: SchemaItem<ElementType>[];
  map<U>(callbackfn: (value: SchemaItem<ElementType>, index: number, array: SchemaItem<ElementType>[]) => U, thisArg?: any): U[];
  getSchemaItemById(id: string): SchemaItem<ElementType>;
  addItem(schemaItem: SchemaItem<ElementType>): void;
  delItem(schemaItem: SchemaItem<ElementType>): void;
}

/**
 * Scheme - a model extended for the needs of rendering
 * Схема - модель расширенная под нужды рендеринга
 */
export default class Schema implements ISchema {
  schemaModel: SchemaItem<ElementType>[] = [];
  private idIndexes: {[key: SchemaItem<ElementType>['id']]: number} = {};

  /**
   * Constructor
   * Конструктор
   * @param {TModelElement[]} model model (модель)
   */
  constructor(model: TModel = []) {
    model.map((item) => {
      const modelElement = cloneDeep(item);
      this.addItem(new SchemaItem(modelElement));
    });
  }

  /**
   * Creates a new array with the result of calling the specified function for each array element
   * Создаёт новый массив с результатом вызова указанной функции для каждого элемента массива
   * @param {Function} callbackfn Function to be called for each element (Функция, вызываемая для каждого элемента)
   * @param {any} thisArg The value used as this when the function is called (Значение, используемое в качестве this при вызове функции)
   * @return {U[]} resulting array (результирущий массив)
   */
  map<U>(callbackfn: (value: SchemaItem<ElementType>, index: number, array: SchemaItem<ElementType>[]) => U, thisArg?: any): U[] {
    return this.schemaModel.map(callbackfn, thisArg);
  }

  /**
   * Get schema element index by id
   * Получить индекс элемента схемы по id
   * @param {string} id element ID (идентификатор элемента)
   * @return {schemaItem} schema element (элемент схемы)
   */
  getSchemaItemById(id: string): SchemaItem<ElementType> {
    const index = this.idIndexes[id];
    return this.schemaModel[index];
  }

  addItem(schemaItem: SchemaItem<ElementType>) {
    this.idIndexes[schemaItem.id] = this.schemaModel.push(schemaItem) - 1;
  }

  delItem(schemaItem: SchemaItem<ElementType>) {
    console.log('Удаляем элемент');
    const delIndex = this.idIndexes[schemaItem.id];
    delete this.idIndexes[schemaItem.id];
    this.schemaModel.splice(delIndex, 1);
  }
}
