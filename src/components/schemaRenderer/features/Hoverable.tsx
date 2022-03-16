import React, {useContext} from 'react';
import {SvgBaseSyntheticEvent} from '../types';
import SchemaItem from '../../schemaModeler/SchemaItem';
import {RenderContext} from './Renderer';
import EventBus from '../../../eventBus/EventBus';
import Events from '../Events';
import {ElementType} from '../../model/ModelElement';

const Hoverable: React.FC<{ schemaItem: SchemaItem<ElementType> }> = ({children, schemaItem}) => {
  useContext(RenderContext);

  const onMouseEnter = (event: SvgBaseSyntheticEvent) => {
    EventBus.publish(Events.Element.Hover.MouseEnter, schemaItem, event);
  };

  const onMouseLeave = (event: SvgBaseSyntheticEvent) => {
    EventBus.publish(Events.Element.Hover.MouseLeave, schemaItem, event);
  };

  return <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
    {children}
  </g>;
};

export default Hoverable;
