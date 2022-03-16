import {point} from '../schemaRenderer/types';

export enum ElementType {
  Rect = 'Rect', Circle = 'Circle', Point = 'Point', Line = 'Line'
}

export type TModel = TModelElement<ElementType>[];

export type TModelElement<T extends ElementType> = {
  type: T;
  transform: point,
  caption: string;
  props: IElementsProps[T];
  connectors?: point[];
}

export interface IElementsProps {
  [ElementType.Circle]: ICircleProps;
  [ElementType.Rect]: IRectProps;
  [ElementType.Point]: IPointProps;
  [ElementType.Line]: ILineProps;
}

/**
 * Function to create a model element
 * Функция для создания элемента модели
 * @param type model element type (тип элемента модели)
 * @param transform location point (точка расположения)
 * @param caption element caption (заголовок)
 * @param props element properties (свойства элемента)
 * @return {TModelElement} model element (элемент модели)
 */
export function createModelElement<T extends ElementType>(type: T, transform: point, caption: string, props: IElementsProps[T]): TModelElement<T> {
  return {
    type,
    transform,
    caption,
    props
  };
}

interface IRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  style: {
    fillOpacity: number;
    fill: string;
  }
}

interface ICircleProps {
  cx: number;
  cy: number;
  r: number;
  style: {
    fillOpacity: number;
    fill: string;
  },
}

interface IPointProps {
  cx: number;
  cy: number;
  r: number;
  style: {
    fillOpacity: number;
    fill: string;
  }
}

interface ILineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  style: {
    stroke: string;
  }
}
