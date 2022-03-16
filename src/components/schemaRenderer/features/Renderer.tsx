import React, {useEffect, useState} from 'react';
import {ISchemaElement} from '../ElementFactory';
import EventBus from '../../../eventBus/EventBus';
import Events from '../Events';
import {ElementType} from '../../model/ModelElement';

export const RenderContext = React.createContext(0);
RenderContext.displayName = 'SchemaItemRenderer';

const Renderer: React.FC<ISchemaElement<ElementType>> = ({children, schemaItem}) => {
  const [render, setRender] = useState(0);
  useEffect(() => {
    const callback = ([id]: [id: string]) => {
      if (schemaItem.id === id) {
        setRender((render) => render + 1);
      }
    };
    EventBus.subscribe(Events.Element.Render, callback);
    return () => {
      EventBus.unsubscribe(Events.Element.Render, callback);
    };
  }, []);

  return <RenderContext.Provider value={render}>
    {children}
  </RenderContext.Provider>;
};

export default Renderer;
