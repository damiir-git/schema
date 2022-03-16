import React, {useContext} from 'react';
import {ISchemaElement} from '../ElementFactory';
import {RenderContext} from '../features/Renderer';
import {ElementType} from '../../model/ModelElement';

const Line: React.FC<ISchemaElement<ElementType.Line>> = ({schemaItem}) => {
  useContext(RenderContext);
  return <line {...schemaItem.modelElement.props} />;
};

export default React.memo(Line);
