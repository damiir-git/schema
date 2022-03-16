import React from 'react';
import ElementFactory from './ElementFactory';
import Schema from '../schemaModeler/Schema';
import Processor from '../schemaModeler/Processor';
import Svg from './Svg';

interface IProps {
  schema: Schema;
  processor: Processor;

  [key: string]: any;
}


const SchemaRenderer: React.FC<IProps> = ({
  children,
  schema,
  processor,
  ...props
}) => {
  const {schemaModel} = schema;
  return <Svg schema={schema} processor={processor} {...props}>
    {schemaModel.map((item) =>
      <ElementFactory schemaItem={item} key={item.id}/>
    )}
    {children}
  </Svg>;
};

export default SchemaRenderer;
