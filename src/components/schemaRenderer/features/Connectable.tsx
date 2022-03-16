import React, {FC} from 'react';
import SchemaItem from '../../schemaModeler/SchemaItem';
import {ElementType} from '../../model/ModelElement';
import {SchemaItemStates} from '../types';

const Connectable: FC<{ schemaItem: SchemaItem<ElementType> }> = ({children, schemaItem}) => {
  const selected = schemaItem.hasState(SchemaItemStates.selected);
  return <g>
    {children}
    {schemaItem.modelElement.connectors && selected &&
    schemaItem.modelElement.connectors.map((point, index) =>
      <g className="connector" key={index}>
        <circle cx={point.x} cy={point.y} r={3} />
      </g>)
    }
  </g>;
};

export default Connectable;
