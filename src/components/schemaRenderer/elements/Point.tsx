import React, {useContext} from 'react';
import {ISchemaElement} from '../ElementFactory';
import {RenderContext} from '../features/Renderer';
import {ElementType} from '../../model/ModelElement';

const Point: React.FC<ISchemaElement<ElementType.Point>> = ({schemaItem}) => {
  useContext(RenderContext);
  return <circle {...schemaItem.modelElement.props} />;
};

export default React.memo(Point);
