import {BaseSyntheticEvent} from 'react';

export type point = {x: number, y: number};

export type svgEventProps = {
  pageX: number;
  pageY: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  button: number;
}

export type SvgBaseSyntheticEvent = BaseSyntheticEvent & svgEventProps;

export enum SchemaItemStates {
  selected = 'selected',
  dragged = 'dragged',
  hovered = 'hovered'
}

export const LEFT_MOUSE_BUTTON = 0;
