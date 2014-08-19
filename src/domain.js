'use strict';

var t = require('tcomb');
var constants = require('react-bootstrap/constants');

var Any = t.Any;
var Nil = t.Nil;
var Str = t.Str;
var Num = t.Num;
var Func = t.Func;
var Bool = t.Bool;
var struct = t.struct;
var subtype = t.subtype;
var enums = t.enums;
var maybe = t.maybe;
var union = t.union;
var list = t.list;
var format = t.format;
var mixin = t.mixin;

//
// utils
//

function propsWarnings(componentName, actualProps, expectedProps) {
  var warnings = [];
  for (var k in actualProps) {
    if (actualProps.hasOwnProperty(k)) {
      if (!expectedProps.hasOwnProperty(k)) {
        warnings.push(format('component `%s` does not handle property `%s`', componentName, k));
      }
    }
  }
  return warnings;
}

function bothProps(p1, p2) {
  var f = function (x) {
    return Nil.is(x[p1]) === Nil.is(x[p2]);
  }; 
  // help tcomb-doc
  f.__doc__ = format('Properties %s and %s must be both defined or both missing', p1, p2);
  return f; 
}

function mix(props, mixins) {
  if (mixins) {
    props = mixins.reduce(function (acc, x) {
      return mixin(acc, x);
    }, props);
  }
  return props;
}

function modelFactory(componentName, props, mixins) {
  mix(props, mixins);
  var model = struct(props, componentName);
  model.warnings = function (props) {
    return propsWarnings(componentName, props, this.meta.props);
  };
  return model;
}

//
// React props
//
var Renderable = Any; // TODO: better typing of React.PropTypes.renderable
var Key = union([Str, Num], 'Key');
var ComponentClass = Str; // TODO implement valid React component class
var Mountable = Any; // TODO better typing

//
// common bootstrap props
//
var BsClass = enums(constants.CLASSES, 'BsClass');
var BsStyle = enums(constants.STYLES, 'BsStyle');
var BsSize = enums(constants.SIZES, 'BsSize');
var Glyph = enums.of(constants.GLYPHS, 'Glyph');
var Placement = enums.of('top right bottom left', 'Placement');
var NavStyle = enums.of('tabs pills', 'NavStyle');

//
// mixins
//
var BootstrapMixin = {
  bsClass: maybe(BsClass),
  bsStyle: maybe(BsStyle),
  bsSize: maybe(BsSize)
};

var CollapsableMixin = {
  collapsable: maybe(Bool),
  defaultExpanded: maybe(Bool),
  expanded: maybe(Bool)
};

//
// Accordion
//
var Accordion = modelFactory('Accordion', {
});

//
// Affix
//
var Affix = modelFactory('Affix', {
  offset: maybe(Num),
  offsetTop: maybe(Num),
  offsetBottom: maybe(Num)
});

//
// Alert
//
var UncheckedAlert = struct({
  bsClass:      maybe(BsClass),
  bsStyle:      maybe(BsStyle),
  onDismiss:    maybe(Func),
  dismissAfter: maybe(Num)
}, 'UncheckedAlert');
var Alert = subtype(UncheckedAlert, bothProps('onDismiss', 'dismissAfter'), 'Alert');
Alert.warnings = function (props) {
  var supertype = this.meta.type;
  return propsWarnings('Alert', props, supertype.meta.props);
};

//
// Badge
//
var Badge = modelFactory('Badge', {
  pullRight: maybe(Bool)
});

//
// Button
//
var Button = modelFactory('Button', {
  active:       maybe(Bool),
  disabled:     maybe(Bool),
  block:        maybe(Bool),
  navItem:      maybe(Bool),
  navDropdown:  maybe(Bool)
}, [BootstrapMixin]);

//
// ButtonGroup
//
var ButtonGroup = modelFactory('ButtonGroup', {
  vertical:  maybe(Bool),
  justified: maybe(Bool)
}, [BootstrapMixin]);

//
// ButtonToolbar
//
var ButtonToolbar = modelFactory('ButtonToolbar', { // TODO: report wrong displayName (ButtonGroup)
}, [BootstrapMixin]);

//
// Carousel
//
var Direction = enums.of('prev, next', 'Direction');
var Carousel = modelFactory('Carousel', {
  slide: maybe(Bool),
  indicators: maybe(Bool),
  controls: maybe(Bool),
  pauseOnHover: maybe(Bool),
  wrap: maybe(Bool),
  onSelect: maybe(Func),
  onSlideEnd: maybe(Func),
  activeIndex: maybe(Num),
  defaultActiveIndex: maybe(Num),
  direction: maybe(Direction)
}, [BootstrapMixin]);

//
// CarouselItem
//
var CarouselItem = modelFactory('CarouselItem', {
  direction: maybe(Direction),
  onAnimateOutEnd: maybe(Func),
  active: maybe(Bool),
  caption: maybe(Renderable)
});

//
// Col
//
var Col = modelFactory('Col', {
  xs: maybe(Num),
  sm: maybe(Num),
  md: maybe(Num),
  lg: maybe(Num),
  xsOffset: maybe(Num),
  smOffset: maybe(Num),
  mdOffset: maybe(Num),
  lgOffset: maybe(Num),
  xsPush: maybe(Num),
  smPush: maybe(Num),
  mdPush: maybe(Num),
  lgPush: maybe(Num),
  xsPull: maybe(Num),
  smPull: maybe(Num),
  mdPull: maybe(Num),
  lgPull: maybe(Num),
  componentClass: maybe(ComponentClass)
});

//
// DropdownButton
//
var DropdownButton = modelFactory('DropdownButton', {
  pullRight: maybe(Bool),
  dropup:    maybe(Bool),
  title:     maybe(Renderable),
  href:      maybe(Str),
  onClick:   maybe(Func),
  onSelect:  maybe(Func),
  navItem:   maybe(Bool),
  key: maybe(Key) // TODO: report missing propType
}, [BootstrapMixin]);

//
// DropdownMenu
//
var DropdownMenu = modelFactory('DropdownMenu', {
  pullRight: maybe(Bool),
  onSelect: maybe(Func)
});

//
// Glyphicon
//
var Glyphicon = modelFactory('Glyphicon', {
  glyph: Glyph
}, [BootstrapMixin]);

//
// Grid
//
var Grid = modelFactory('Grid', {
  fluid: maybe(Bool),
  componentClass: maybe(ComponentClass)
});

//
// Input
//
var InputStyle = enums.of('success warning error', 'InputStyle');
var Input = modelFactory('Input', {
  type: maybe(Str),
  label: maybe(Renderable),
  help: maybe(Renderable),
  addonBefore: maybe(Renderable),
  addonAfter: maybe(Renderable),
  bsStyle: maybe(InputStyle),
  hasFeedback: maybe(Bool),
  groupClassName: maybe(Str),
  wrapperClassName: maybe(Str),
  labelClassName: maybe(Str),
  checked: maybe(Bool), // TODO report missing propType
  readOnly: maybe(Bool), // TODO report missing propType
  multiple: maybe(Bool), // TODO report missing propType
  value: maybe(Str), // TODO report missing propType
  defaultValue: maybe(Str) // TODO report missing propType
});

//
// Jumbotron
//
var Jumbotron = modelFactory('Jumbotron', {
});

//
// Label
//
var Label = modelFactory('Label', {
}, [BootstrapMixin]);

//
// MenuItem
//
var MenuItem = modelFactory('MenuItem', {
  header:   maybe(Bool),
  divider:  maybe(Bool),
  href:     maybe(Str),
  title:    maybe(Str),
  onSelect: maybe(Func),
  key: maybe(Key) // TODO: report missing propType
});

//
// Modal
//
var Backdrop = union([enums.of('static'), Bool], 'Backdrop');
var Modal = modelFactory('Modal', {
  title: maybe(Renderable),
  backdrop: maybe(Backdrop),
  keyboard: maybe(Bool),
  closeButton: maybe(Bool),
  animation: maybe(Bool),
  onRequestHide: Func
}, [BootstrapMixin]);

//
// ModalTrigger
//
var ModalTrigger = modelFactory('ModalTrigger', {
  container: maybe(Mountable),
  modal: Renderable
});

//
// Nav
//
var Nav = modelFactory('Nav', {
  bsClass: maybe(BsClass),
  bsStyle: maybe(NavStyle), // TODO: report duplicate propType in BootstrapMixin
  bsSize: maybe(BsSize),
  stacked: maybe(Bool),
  justified: maybe(Bool),
  onSelect: maybe(Func),
  collapsable: maybe(Bool), // TODO: report duplicate propType in CollapsableMixin
  expanded: maybe(Bool), // TODO: report duplicate propType in CollapsableMixin
  defaultExpanded: maybe(Bool),
  navbar: maybe(Bool),
  activeKey: maybe(Key) // TODO: report missin propType
});

//
// Navbar
//
var Navbar = modelFactory('Navbar', {
  fixedTop: maybe(Bool),
  fixedBottom: maybe(Bool),
  staticTop: maybe(Bool),
  inverse: maybe(Bool),
  fluid: maybe(Bool),
  role: maybe(Str),
  componentClass: maybe(ComponentClass),
  brand: maybe(Renderable),
  toggleButton: maybe(Renderable),
  onToggle: maybe(Func),
  navExpanded: maybe(Bool),
  defaultNavExpanded: maybe(Bool)
}, [BootstrapMixin]);

//
// NavItem
//
var NavItem = modelFactory('NavItem', {
  onSelect: maybe(Func),
  active: maybe(Bool),
  disabled: maybe(Bool),
  href: maybe(Str),
  title: maybe(Str),
  key: maybe(Key)
}, [BootstrapMixin]);

//
// OverlayTrigger
//
var TriggerA = enums.of('manual click hover focus', 'TriggerA'); // TODO understand what are these types
var TriggerB = enums.of('click hover focus', 'TriggerB');
var TriggerC = list(TriggerB);
var Trigger = union([TriggerA, TriggerC]);
var OverlayTrigger = modelFactory('OverlayTrigger', {
  container: maybe(Mountable),
  trigger: maybe(Trigger),
  placement: maybe(Placement),
  delay: maybe(Num),
  delayShow: maybe(Num),
  delayHide: maybe(Num),
  defaultOverlayShown: maybe(Bool),
  overlay: Renderable
}, [BootstrapMixin]);

//
// PageHeader
//
var PageHeader = modelFactory('PageHeader', {
});

//
// PageItem
//
var PageItem = modelFactory('PageItem', {
  disabled: maybe(Bool),
  previous: maybe(Bool),
  next: maybe(Bool),
  onSelect: maybe(Func),
  href: maybe(Str) // TODO: report missing propType
});

//
// Pager
//
var Pager = modelFactory('Pager', {
  onSelect: maybe(Func)
});

//
// Panel
//
var Panel = modelFactory('Panel', {
  header: maybe(Renderable),
  footer: maybe(Renderable),
  onClick: maybe(Func),
  key: maybe(Key) // TODO: report missing propType
}, [BootstrapMixin, CollapsableMixin]);

//
// PanelGroup
//
var PanelGroup = modelFactory('PanelGroup', {
  collapsable: maybe(Bool),
  activeKey: Any,
  defaultActiveKey: Any,
  onSelect: maybe(Func),
  accordion: maybe(Bool) // TODO: report missing propType
}, [BootstrapMixin]);

//
// Popover
//
var Popover = modelFactory('Popover', {
  placement: Placement,
  positionLeft: maybe(Num),
  positionTop: maybe(Num),
  arrowOffsetLeft: maybe(Num),
  arrowOffsetTop: maybe(Num),
  title: maybe(Renderable)
}, [BootstrapMixin]);

//
// ProgressBar
//
var ProgressBar = modelFactory('ProgessBar', {
  min: maybe(Num),
  now: maybe(Num),
  max: maybe(Num),
  label: maybe(Renderable),
  srOnly: maybe(Bool),
  striped: maybe(Bool),
  active: maybe(Bool)
}, [BootstrapMixin]);

//
// Row
//
var Row = modelFactory('Row', {
  componentClass: maybe(ComponentClass)
});

//
// SplitButton
//
var SplitButton = modelFactory('SplitButton', {
  pullRight:     maybe(Bool),
  title:         maybe(Renderable),
  href:          maybe(Str),
  dropdownTitle: maybe(Renderable),
  onClick:       maybe(Func),
  onSelect:      maybe(Func),
  disabled:      maybe(Bool)
}, [BootstrapMixin]);

//
// SubNav
//
var SubNav = modelFactory('SubNav', {
  onSelect: maybe(Func),
  active: maybe(Bool),
  disabled: maybe(Bool),
  href: maybe(Str),
  title: maybe(Str),
  text: maybe(Renderable)
}, [BootstrapMixin]);

//
// TabbedArea
//
var TabbedArea = modelFactory('TabbedArea', {
  bsClass: maybe(BsClass),
  bsStyle: maybe(NavStyle), // TODO: report duplicate propType in BootstrapMixin
  bsSize: maybe(BsSize),
  animation: maybe(Bool),
  onSelect: maybe(Func),
  defaultActiveKey: maybe(Key) // TODO: report missing propType
});

//
// Table
//
var Table = modelFactory('Table', {
  striped: maybe(Bool),
  bordered: maybe(Bool),
  condensed: maybe(Bool),
  hover: maybe(Bool),
  responsive: maybe(Bool)
});

//
// TabPane
//
var TabPane = modelFactory('TabPane', {
  key: maybe(Key), // TODO: report missing propType
  tab: maybe(Str) // TODO: report missing propType
});

//
// Tooltip
//
var Tooltip = modelFactory('Tooltip', {
  placement: maybe(Placement),
  positionLeft: maybe(Num),
  positionTop: maybe(Num),
  arrowOffsetLeft: maybe(Num),
  arrowOffsetTop: maybe(Num)
}, [BootstrapMixin]);

//
// Well
//
var Well = modelFactory('Well', {
}, [BootstrapMixin]);

module.exports = {
  Accordion: Accordion,
  Affix: Affix,
  Alert: Alert,
  Badge: Badge,
  Button: Button,
  ButtonGroup: ButtonGroup,
  ButtonToolbar: ButtonToolbar,
  Carousel: Carousel,
  CarouselItem: CarouselItem,
  Col: Col,
  DropdownButton: DropdownButton,
  DropdownMenu: DropdownMenu,
  Glyphicon: Glyphicon,
  Grid: Grid,
  Input: Input,
  Jumbotron: Jumbotron,
  Label: Label,
  MenuItem: MenuItem,
  Modal: Modal,
  ModalTrigger: ModalTrigger,
  Nav: Nav,
  Navbar: Navbar,
  NavItem: NavItem,
  OverlayTrigger: OverlayTrigger,
  PageHeader: PageHeader,
  PageItem: PageItem,
  Pager: Pager,
  Panel: Panel,
  PanelGroup: PanelGroup,
  Popover: Popover,
  ProgressBar: ProgressBar,
  Row: Row,
  SplitButton: SplitButton,
  SubNav: SubNav,
  TabbedArea: TabbedArea,
  Table: Table,
  TabPane: TabPane,
  Tooltip: Tooltip,
  Well: Well
};