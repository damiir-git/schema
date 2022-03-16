import React, {useContext} from 'react';
import Selectable from '../features/Selectable';
import {ISchemaElement} from '../ElementFactory';
import {RenderContext} from '../features/Renderer';
import Hoverable from '../features/Hoverable';
import {ElementType} from '../../model/ModelElement';
import Connectable from '../features/Connectable';

const Circle: React.FC<ISchemaElement<ElementType.Circle>> = ({schemaItem}) => {
  useContext(RenderContext);
  return <Selectable schemaItem={schemaItem}>
    <Connectable schemaItem={schemaItem}>
      <Hoverable schemaItem={schemaItem}>
        <circle {...schemaItem.modelElement.props} />
      </Hoverable>
    </Connectable>
  </Selectable>;
};

export default React.memo(Circle);
