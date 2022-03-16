import React, {useContext} from 'react';
import eventBus from '../../../eventBus/EventBus';
import Events from '../Events';
import {LEFT_MOUSE_BUTTON, SvgBaseSyntheticEvent} from '../types';
import SchemaItem from '../../schemaModeler/SchemaItem';
import {RenderContext} from './Renderer';
import {ElementType} from '../../model/ModelElement';

const Selectable: React.FC<{schemaItem: SchemaItem<ElementType>}> = ({children, schemaItem}) => {
  useContext(RenderContext);

  const onMouseDown = (event: SvgBaseSyntheticEvent) => {
    if (event.button === LEFT_MOUSE_BUTTON) {
      eventBus.publish(Events.Element.Select.MouseDown, schemaItem, event);
    }
  };

  const onMouseUp = (event: SvgBaseSyntheticEvent) => {
    if (event.button === LEFT_MOUSE_BUTTON) {
      eventBus.publish(Events.Element.Select.MouseUp, schemaItem, event);
    }
  };

  return <g onMouseDown={onMouseDown} onMouseUp={onMouseUp} >
    {children}
  </g>;
};

export default Selectable;
