import React, {useContext} from 'react';
import Selectable from '../features/Selectable';
import {ISchemaElement} from '../ElementFactory';
import {RenderContext} from '../features/Renderer';
import Hoverable from '../features/Hoverable';
import {ElementType} from '../../model/ModelElement';
import Connectable from '../features/Connectable';

const Rect: React.FC<ISchemaElement<ElementType.Rect>> = ({schemaItem}) => {
  useContext(RenderContext);
  return <Selectable schemaItem={schemaItem}>
    <Connectable schemaItem={schemaItem}>
      <Hoverable schemaItem={schemaItem}>
        <rect {...schemaItem.modelElement.props} />
        <foreignObject x={0} y={0} width={schemaItem.modelElement.props.width} height={schemaItem.modelElement.props.height}>
          <div className="rect-text-block">
            <p>{schemaItem.modelElement.caption}</p>
          </div>
        </foreignObject>
      </Hoverable>
    </Connectable>
  </Selectable>;
};

export default React.memo(Rect);
