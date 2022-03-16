import React, {useContext} from 'react';
import classNames from 'classnames';
import {RenderContext} from './Renderer';
import {ISchemaElement} from '../ElementFactory';
import {ElementType} from '../../model/ModelElement';

const Transform: React.FC<ISchemaElement<ElementType>> = ({children, schemaItem}) => {
  useContext(RenderContext);
  const x = schemaItem.modelElement.transform.x;
  const y = schemaItem.modelElement.transform.y;

  let statesClasses = '';
  for (const state of schemaItem.states) {
    statesClasses = statesClasses.concat(` ${state}`);
  }

  return <g transform={`translate(${x},${y})`} id={schemaItem.id} className={classNames('element', statesClasses)}>
    {children}
  </g>;
};

export default Transform;
