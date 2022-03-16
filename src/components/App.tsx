import {hot} from 'react-hot-loader';
import React from 'react';
import SchemaRenderer from './schemaRenderer/SchemaRenderer';
import Schema from './schemaModeler/Schema';
import Processor from './schemaModeler/Processor';
import eventBus from '../eventBus/EventBus';
import model from '../mock/model';

const schema = new Schema(model);
const processor = new Processor(schema, eventBus);
const viewBox: [minX: number, minY: number, width: number, height: number] = [10, 10, 200, 300];

const App = () => {
  return <SchemaRenderer schema={schema} processor={processor} viewBox={viewBox} />;
};

export default hot(module)(App);
