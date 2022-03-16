import React, {useEffect, useRef, useState} from 'react';
import Schema from '../schemaModeler/Schema';
import EventBus from '../../eventBus/EventBus';
import Events from './Events';
import Processor from '../schemaModeler/Processor';
import {SvgBaseSyntheticEvent} from './types';
import eventBus from '../../eventBus/EventBus';

const defaultProps = {
  version: '1.1',
  baseProfile: 'full',
  width: '100%',
  height: '100%',
};

interface IProps {
  schema: Schema;
  processor: Processor;

  [key: string]: any;
}


const Svg: React.FC<IProps> = ({
  children,
  schema,
  processor,
  ...props
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const svgProps = {...defaultProps, ...props};

  const [, setRender] = useState(0);

  useEffect(() => {
    const callback = () => {
      setRender((render) => render + 1);
    };
    EventBus.subscribe(Events.Root.Render, callback);
    return () => {
      EventBus.unsubscribe(Events.Root.Render, callback);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      processor.attachTo(ref.current);
    }
  }, [ref.current]);

  const onMouseDown = (event: SvgBaseSyntheticEvent) => {
    eventBus.publish(Events.Root.MouseDown, event);
  };

  const onMouseMove = (event: SvgBaseSyntheticEvent) => {
    // console.log('onMouseMove.event', event);
    eventBus.publish(Events.Root.MouseMove, event);
  };

  const onMouseUp = (event: SvgBaseSyntheticEvent) => {
    eventBus.publish(Events.Root.MouseUp, event);
  };

  const onMouseLeave = (event: SvgBaseSyntheticEvent) => {
    eventBus.publish(Events.Root.MouseLeave, event);
  };

  const onClick = (event: SvgBaseSyntheticEvent) => {
    eventBus.publish(Events.Root.Click, event);
  };

  return <svg {...svgProps} ref={ref}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {children}
  </svg>;
};

export default Svg;
