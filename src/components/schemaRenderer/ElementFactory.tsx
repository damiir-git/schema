import React, {NamedExoticComponent} from 'react';
import SchemaItem from '../schemaModeler/SchemaItem';
import Rect from './elements/Rect';
import Circle from './elements/Circle';
import Point from './elements/Point';
import Renderer from './features/Renderer';
import Transform from './features/Transform';
import {ElementType} from '../model/ModelElement';
import Line from './elements/Line';

const elements: { [key in ElementType]: NamedExoticComponent<ISchemaElement<key>> } = {
  [ElementType.Rect]: Rect,
  [ElementType.Circle]: Circle,
  [ElementType.Point]: Point,
  [ElementType.Line]: Line,
};

export interface ISchemaElement<K extends ElementType> {
  schemaItem: SchemaItem<K>
}

const ElementFactory: React.FC<ISchemaElement<ElementType>> = ({schemaItem}): JSX.Element => {
  const Comp = elements[schemaItem.modelElement.type];
  // @ts-ignore
  return <ElementWrap schemaItem={schemaItem}><Comp schemaItem={schemaItem} /></ElementWrap>;
};

export default React.memo(ElementFactory);

const ElementWrap: React.FC<ISchemaElement<ElementType>> = ({children, schemaItem}) => {
  return <Renderer schemaItem={schemaItem}>
    <Transform schemaItem={schemaItem}>
      {children}
    </Transform>
  </Renderer>;
};
