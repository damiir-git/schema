import {ElementType, TModel} from '../components/model/ModelElement';

const model: TModel = [
  {
    type: ElementType.Rect,
    transform: {x: 0, y: 50},
    caption: 'drag me',
    props: {
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      rx: 2,
      ry: 2,
      style: {
        fillOpacity: 0.7, fill: '#f7e2a0',
      },
    },
    connectors: [{
      x: 0,
      y: 25
    }, {
      x: 100,
      y: 25
    }, {
      x: 50,
      y: 0
    }, {
      x: 50,
      y: 50
    }]
  },
  {
    type: ElementType.Circle,
    transform: {x: 150, y: 70},
    caption: '',
    props: {
      cx: 0,
      cy: 0,
      r: 15,
      style: {
        fillOpacity: 0.7, fill: '#f7e2a0',
      },
    },
    connectors: [{
      x: -15,
      y: 0
    }, {
      x: 15,
      y: 0
    }]
  },
  {
    type: ElementType.Circle,
    transform: {x: -55, y: 70},
    caption: '',
    props: {
      cx: 0,
      cy: 0,
      r: 15,
      style: {
        fillOpacity: 0.7, fill: '#f7e2a0',
      },
    },
  },
];

export default model;
