import {IEventBus} from '../../eventBus/EventBus';
import Events from '../schemaRenderer/Events';
import {LEFT_MOUSE_BUTTON, point, SchemaItemStates, SvgBaseSyntheticEvent} from '../schemaRenderer/types';
import {ISchema} from './Schema';
import SchemaItem from './SchemaItem';
import {ElementType} from '../model/ModelElement';

type eventParams = [SchemaItem<ElementType>, SvgBaseSyntheticEvent];

/**
 * Processor. Receives events from eventBus and changes schema
 * (Процессор. Получает события от eventBus и меняет схему)
 */
export default class Processor {
  private svg: SVGSVGElement | null;
  private schema: ISchema;
  private eventBus: IEventBus;
  private selectedItems: SchemaItem<ElementType>[];
  private dragStartPoint: point | null;
  private dragItemsStartPoints: { [key: string]: point };

  /**
   * Constructor
   * @param schema Scheme (Схема)
   * @param eventBus Event Bus (Шина событий)
   */
  constructor(schema: ISchema, eventBus: IEventBus) {
    this.svg = null;
    this.schema = schema;
    this.eventBus = eventBus;
    this.selectedItems = [];
    this.dragStartPoint = null;
    this.dragItemsStartPoints = {};
    /* выбор элементов */
    this.eventBus.subscribe(Events.Element.Select.MouseDown, this.selectMouseDown);
    this.eventBus.subscribe(Events.Element.Select.MouseUp, this.selectMouseUp);
    /* drag & drop */
    this.eventBus.subscribe(Events.Root.MouseDown, this.dragMouseDown);
    this.eventBus.subscribe(Events.Root.MouseMove, this.dragMouseMove);
    this.eventBus.subscribe(Events.Root.MouseUp, this.dragMouseUp);
    this.eventBus.subscribe(Events.Root.MouseLeave, this.dragMouseUp);
    /* клик по svg */
    this.eventBus.subscribe(Events.Root.Click, this.rootClick);
    /* hover */
    this.eventBus.subscribe(Events.Element.Hover.MouseEnter, this.hoverMouseEnter);
    this.eventBus.subscribe(Events.Element.Hover.MouseLeave, this.hoverMouseLeave);
  }

  /**
   * Attaches the processor to the SVG render area
   * (Прикрепляет процессор к области отображения SVG)
   * @param svg svg element (SVG элемент)
   */
  attachTo(svg: SVGSVGElement) {
    this.svg = svg;
  }

  private selectSchemaItem = ([schemaItem, event]: eventParams) => {
    const {ctrlKey} = event;

    if (ctrlKey) {
      /* если зажат ctrl значит либо добавляем элемент к выбранным, либо исключаем из него */
      const foundSchemaItemIndex = this.selectedItems.findIndex((item) => item === schemaItem);
      if (foundSchemaItemIndex > -1) {
        schemaItem.deleteState(SchemaItemStates.selected);
        this.selectedItems.splice(foundSchemaItemIndex, 1);
      } else {
        schemaItem.addState(SchemaItemStates.selected);
        this.selectedItems.push(schemaItem);
      }
      this.renderItem(schemaItem.id);
    } else {
      /* если кликнули мышью по элементу (без ctrl) выделяем элемент, остальные выделения снимаем */
      this.selectedItems.forEach((item) => {
        item.deleteState(SchemaItemStates.selected);
        this.renderItem(item.id);
      });
      schemaItem.addState(SchemaItemStates.selected);
      this.selectedItems = [schemaItem];
      this.renderItem(schemaItem.id);
    }
  };

  private selectMouseDown = ([schemaItem, event]: eventParams) => {
    const selected = schemaItem.hasState(SchemaItemStates.selected);
    /* если текущий элемент не выбран, или зажата клавиша ctrl, то выделение срабатывает на нажатии кнопки мыши */
    if (!selected || event.ctrlKey) {
      this.selectSchemaItem([schemaItem, event]);
    }
  };

  private selectMouseUp = ([schemaItem, event]: eventParams) => {
    const selected = schemaItem.hasState(SchemaItemStates.selected);
    /* если текущий элемент выбран и не зажата ctrl, то выделение срабатывает при отпускании кнопки мыши */
    if (selected && !event.ctrlKey) {
      this.selectSchemaItem([schemaItem, event]);
    }
  };

  /**
   * Converts a point from browser client space to SVG space
   * Конвертирует точку из пространства клиента браузера в пространство SVG
   * @param point point in client space (точка в пространстве клиента)
   * @private
   * @return pt point in space svg (точка в пространстве svg)
   */
  private convertClientToSvgPoint(point: point): DOMPoint | null {
    let pt = null;
    if (this.svg) {
      pt = this.svg.createSVGPoint();
      pt.x = point.x;
      pt.y = point.y;
      pt = pt.matrixTransform(this.svg.getScreenCTM()?.inverse());
    }
    return pt;
  }

  /**
   * Get event coordinates in svg space
   * Получить координаты события в пространстве svg
   * @param event svg event (событие svg)
   * @return point point in space svg (точка в пространстве svg)
   */
  private getSvgPointCoordinateFromEvent = (event: SvgBaseSyntheticEvent): DOMPoint | null => {
    return this.convertClientToSvgPoint({x: event.clientX, y: event.clientY});
  };

  /**
   * Mouse click handler for drag & drop
   * Обработчик нажатия на кнопку мыши при drag & drop
   * @param event svg event (событие svg)
   */
  private dragMouseDown = ([event]: [SvgBaseSyntheticEvent]) => {
    if (event.button === LEFT_MOUSE_BUTTON) {
      this.dragItemsStartPoints = {};
      this.selectedItems.forEach((item) => {
        item.addState(SchemaItemStates.dragged);
        this.dragItemsStartPoints[item.id] = {...item.modelElement.transform};
      });

      const pt = this.getSvgPointCoordinateFromEvent(event);
      if (pt) {
        this.dragStartPoint = {x: pt.x, y: pt.y};
        this.selectedItems.forEach((item) => {
          item.addState(SchemaItemStates.dragged);
          this.renderItem(item.id);
        });
      }
    }
  };

  /**
   * Mouse movement handler for drag & drop
   * Обработчик движения мыши при drag & drop
   * @param event svg event (событие svg)
   */
  private dragMouseMove = ([event]: [SvgBaseSyntheticEvent]) => {
    const currentPoint = this.getSvgPointCoordinateFromEvent(event);
    if (this.dragStartPoint && currentPoint) {
      const deltaX = currentPoint.x - this.dragStartPoint.x;
      const deltaY = currentPoint.y - this.dragStartPoint.y;
      this.selectedItems.forEach((item) => {
        const dragItemStartPoint = this.dragItemsStartPoints[item.id];
        item.transform(dragItemStartPoint.x + deltaX, dragItemStartPoint.y + deltaY);
        this.renderItem(item.id);
      });
    }
  };

  /**
   * Mouse button release handler on drag & drop
   * Обработчик отпускания кнопки мыши при drag & drop
   */
  private dragMouseUp = () => {
    this.selectedItems.forEach((item) => {
      item.deleteState(SchemaItemStates.dragged);
      this.renderItem(item.id);
    });
    this.dragStartPoint = null;
    this.dragItemsStartPoints = {};
  };

  private rootClick = ([event]: [SvgBaseSyntheticEvent]) => {
    const isEmptyPlace = this.svg === event.target;
    if (isEmptyPlace) {
      this.selectionClear();
    }
  };

  private hoverMouseEnter = ([schemaItem]: eventParams) => {
    schemaItem.addState(SchemaItemStates.hovered);
    this.renderItem(schemaItem.id);
  };

  private hoverMouseLeave = ([schemaItem]: eventParams) => {
    schemaItem.deleteState(SchemaItemStates.hovered);
    this.renderItem(schemaItem.id);
  };

  /**
   * Force an element to redraw
   * Заставить элемент перерисоваться
   * @param id element ID идентификатор элемента
   */
  private renderItem = (id: string) => {
    this.eventBus.publish(Events.Element.Render, id);
  };

  private selectionClear = () => {
    this.selectedItems.forEach((item) => {
      item.deleteState(SchemaItemStates.selected);
      this.renderItem(item.id);
    });
  };
}
