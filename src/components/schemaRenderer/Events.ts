const Events = {
  Root: {
    Render: 'Root.Render',
    MouseDown: 'Root.MouseDown',
    MouseMove: 'Root.MouseMove',
    MouseUp: 'Root.MouseUp',
    MouseLeave: 'Root.MouseLeave',
    Click: 'Root.Click',
  },
  Element: {
    Select: {
      MouseDown: 'Element.Select.MouseDown',
      MouseUp: 'Element.Select.MouseUp',
    },
    Hover: {
      MouseEnter: 'Element.Hover.MouseEnter',
      MouseLeave: 'Element.Hover.MouseLeave',
    },
    Render: 'Element.Render'
  }
};

export default Events;
