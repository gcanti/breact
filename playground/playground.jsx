/** @jsx React.DOM */
'use strict';

var t = require('tcomb');
var React = require('react');
var bs = require('tcomb-react-bootstrap');

//
// import all components
//

var Accordion = bs.Accordion;
var Affix = bs.Affix;
var Alert = bs.Alert;
var Badge = bs.Badge;
var Button = bs.Button;
var ButtonGroup = bs.ButtonGroup;
var ButtonToolbar = bs.ButtonToolbar;
var Carousel = bs.Carousel;
var CarouselItem = bs.CarouselItem;
var Col = bs.Col;
var DropdownButton = bs.DropdownButton;
var DropdownMenu = bs.DropdownMenu;
var Glyphicon = bs.Glyphicon;
var Grid = bs.Grid;
var Input = bs.Input;
var Jumbotron = bs.Jumbotron;
var Label = bs.Label;
var MenuItem = bs.MenuItem;
var Modal = bs.Modal;
var ModalTrigger = bs.ModalTrigger;
var Nav = bs.Nav;
var Navbar = bs.Navbar;
var NavItem = bs.NavItem;
var OverlayTrigger = bs.OverlayTrigger;
var PageHeader = bs.PageHeader;
var PageItem = bs.PageItem;
var Pager = bs.Pager;
var Panel = bs.Panel;
var PanelGroup = bs.PanelGroup;
var Popover = bs.Popover;
var ProgressBar = bs.ProgressBar;
var Row = bs.Row;
var SplitButton = bs.SplitButton;
var SubNav = bs.SubNav;
var TabbedArea = bs.TabbedArea;
var Table = bs.Table;
var TabPane = bs.TabPane;
var Tooltip = bs.Tooltip;
var Well = bs.Well;

// if true, open the debugger when a failure occurs
var isDebuggerEnabled = false;

// override default fail behaviour of tcomb https://github.com/gcanti/tcomb
t.options.onFail = function (message) {
  if (isDebuggerEnabled) {
    debugger;
  }
  throw new Error(message);
};

//
// utils
//

// return the HTML documentation of a component
function doc(componentName) {
  var domain = {};
  domain[componentName] = bs[componentName].Model;
  // tcomb-doc
  var json = TcombDoc.parse(domain).toJSON();
  var markdown = TcombDoc.formatMarkdown(json);
  return marked(markdown);
}

var Documentation = React.createClass({
  render: function () {
    return (
      <div className="docs">
        <p className="lead">Check out the documentation:</p>
        <p className="text-right"><em className="text-muted"><code>maybe(Type)</code> means an optional instance of <code>Type</code></em></p>
        <div dangerouslySetInnerHTML={{__html: doc(this.props.componentName)}} />
      </div>
    );
  }
});

// display error and related documentation
function getErrorAlert(err, componentName){
  var isSyntaxError = !!err.lineNumber;
  var message = err.message;
  return (
    <div>
      <Alert bsStyle="danger">
        {message}
      </Alert>
      { isSyntaxError ? "" :
      <Documentation componentName={componentName}/>
      }
    </div>
  );
}

// list of examples loaded into the select input
var examples = {
  Accordion: '<Accordion>\n  <Panel header="Collapsible Group Item #1" key={1}> Anim pariatur cliche reprehenderit </Panel>\n  <Panel header="Collapsible Group Item #2" key={2}> Anim pariatur cliche reprehenderit</Panel>\n  <Panel header="Collapsible Group Item #3" key={3}>Anim pariatur cliche reprehenderit\n</Panel>\n</Accordion>',
  Alert: '<Alert bsStyle="warning">\n  <strong>Holy guacamole!</strong>\n</Alert>',
  Badge: '<p>Badges <Badge>42</Badge></p>',
  Button: '<Button bsStyle="danger" bsSize="medium">Save</Button>',
  ButtonGroup: '<ButtonGroup>\n  <Button>Left</Button>\n  <Button>Middle</Button>\n  <Button>Right</Button>\n</ButtonGroup>',
  ButtonToolbar: '<ButtonToolbar>\n  <Button>Default</Button>\n  <Button bsStyle="primary">Primary</Button>\n  <Button bsStyle="success">Success</Button>\n  <Button bsStyle="info">Info</Button>\n  <Button bsStyle="warning">Warning</Button>\n  <Button bsStyle="danger">Danger</Button>\n  <Button bsStyle="link">Link</Button>\n</ButtonToolbar>',
  Carousel: '<Carousel>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>First slide label</h3> <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\n  </div>\n  </CarouselItem>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>Second slide label</h3>\n  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n  </div>\n  </CarouselItem>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>Third slide label</h3>\n  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\n  </div>\n  </CarouselItem>\n  </Carousel>',
  DropdownButton: '<DropdownButton bsStyle="success" title="Choose">\n  <MenuItem key="1">Action</MenuItem>\n  <MenuItem key="2">Another action</MenuItem>\n  <MenuItem key="3">Something else here</MenuItem>\n  <MenuItem divider />\n  <MenuItem key="4">Separated link</MenuItem>\n</DropdownButton>',
  Glyphicon: '<div> <ButtonToolbar> <ButtonGroup> <Button><Glyphicon glyph="align-left" /></Button> <Button><Glyphicon glyph="align-center" /></Button> <Button><Glyphicon glyph="align-right" /></Button> <Button><Glyphicon glyph="align-justify" /></Button> </ButtonGroup> </ButtonToolbar> <ButtonToolbar> <ButtonGroup> <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button> <Button><Glyphicon glyph="star" /> Star</Button> <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button> <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button> </ButtonGroup> </ButtonToolbar> </div>',
  Input: '<form> <Input type="text" defaultValue="text" /> <Input type="password" defaultValue="secret" /> <Input type="checkbox" checked readOnly label="checkbox"/> <Input type="radio" checked readOnly label="radio"/> <Input type="select" defaultValue="select"> <option value="select">select</option> <option value="other">...</option> </Input> <Input type="select" multiple> <option value="select">select (multiple)</option> <option value="other">...</option> </Input> <Input type="textarea" defaultValue="textarea" /> <Input type="static" value="static" /> </form>',
  Modal: '<Modal title="Modal title" backdrop={false} animation={false} onRequestHide={handleHide}> <div className="modal-body"> One fine body... </div> <div className="modal-footer"> <Button>Close</Button> <Button bsStyle="primary">Save changes</Button> </div> </Modal>',
  Nav: '<Nav bsStyle="pills" activeKey={1}>\n  <NavItem key={1} href="/home">NavItem 1 content</NavItem>\n  <NavItem key={2} title="Item">NavItem 2 content</NavItem>\n  <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>\n</Nav>',
  Navbar: '<Navbar>\n  <Nav>\n  <NavItem key={1} href="#">Link</NavItem>\n  <NavItem key={2} href="#">Link</NavItem>\n  <DropdownButton key={3} title="Dropdown">\n  <MenuItem key="1">Action</MenuItem>\n  <MenuItem key="2">Another action</MenuItem>\n  <MenuItem key="3">Something else here</MenuItem>\n  <MenuItem divider />\n  <MenuItem key="4">Separated link</MenuItem>\n  </DropdownButton>\n  </Nav>\n</Navbar>',
  Pager: '<Pager>\n  <PageItem href="#">Previous</PageItem>\n  <PageItem href="#">Next</PageItem>\n</Pager>',
  PanelGroup: '<PanelGroup activeKey={1} accordion>\n  <Panel header="Panel 1" key={1}>Panel 1 content</Panel>\n  <Panel header="Panel 2" key={2}>Panel 2 content</Panel>\n</PanelGroup>',
  Popover: '<div>\n  <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right"> And here\'s some <strong>amazing</strong> content. It\'s very engaging. right? </Popover>\n</div>',
  ProgressBar: '<div>\n  <ProgressBar striped bsStyle="success" now={40} />\n  <ProgressBar striped bsStyle="info" now={20} />\n  <ProgressBar striped bsStyle="warning" now={60} />\n  <ProgressBar striped bsStyle="danger" now={80} />\n</div>',
  SplitButton: '<SplitButton bsStyle="success" title="success">\n  <MenuItem key="1">Action</MenuItem>\n  <MenuItem key="2">Another action</MenuItem>\n  <MenuItem key="3">Something else here</MenuItem>\n  <MenuItem divider />\n  <MenuItem key="4">Separated link</MenuItem>\n</SplitButton>',
  TabbedArea: '<TabbedArea defaultActiveKey={2}>\n  <TabPane key={1} tab="Tab 1"><p>TabPane 1 content</p></TabPane>\n  <TabPane key={2} tab="Tab 2"><p>TabPane 2 content</p></TabPane>\n</TabbedArea>',
  Table: '<Table striped bordered condensed hover>\n  <thead>\n  <tr>\n  <th>#</th>\n  <th>First Name</th>\n  <th>Last Name</th>\n  <th>Username</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr>\n  <td>1</td>\n  <td>Mark</td>\n  <td>Otto</td>\n  <td>@mdo</td>\n  </tr>\n  <tr>\n  <td>2</td>\n  <td>Jacob</td>\n  <td>Thornton</td>\n  <td>@fat</td>\n  </tr>\n  <tr>\n  <td>3</td>\n  <td colSpan="2">Larry the Bird</td>\n  <td>@twitter</td>\n  </tr>\n  </tbody>\n</Table>',
  Tooltip: '<div>\n  <Tooltip placement="right" positionLeft={150} positionTop={50}><strong>Holy guacamole!</strong> Check this info. </Tooltip>\n</div>',
  Well: '<div>\n  <Well bsSize="large">Look I\'m in a large well!</Well>\n  <Well bsSize="small">Look I\'m in a small well!</Well>\n</div>'        
};

// build select options
var options = Object.keys(examples).sort().map(function (k) {
  return <option key={k} value={k}>{k}</option>;
});

var JSX_PREAMBLE = '/** @jsx React.DOM */\n';

// handler for the Modal component
function handleHide() {
  $('.modal').hide();
}

//
// UI components
//

// returns a link to the tcomb-reactbootstrap github repo
function tcombReactBootstrapRepo(title) {
  return <a href="https://github.com/gcanti/tcomb-react-bootstrap">{title}</a>
}

var Header = React.createClass({
  render: function () {
    return (
      <Row className="header">
        <Col md={6}>
          <h1>.jsx Playground <span className="text-muted">&beta;</span></h1>
          <p className="text-muted">Write your React.js components with safety and easy debugging</p>
          <br/>
          <p>This playground is a three days hack aiming to add a type checking layer to
          the awesome library <a href="https://github.com/react-bootstrap/react-bootstrap">react-bootstrap</a> mantaining identical APIs.
          You opt-in during the prototyping (full debugging support) and then you opt-out in production with just one 
          <code>require</code> change.
          Beware, checkings are <i>very</i> strict at the moment. <b>If you like it, please give me a star on {tcombReactBootstrapRepo('GitHub')}</b>
          </p>
        </Col>
        <Col md={6}>
          <div className="text-right repo-link">
              <p> 
                <a href="https://github.com/gcanti/tcomb">
                  <img className="img-circle" src="https://gcanti.github.io/resources/tcomb/logo.png"/>
                </a>
              </p>
              <br/>
              <br/>
              <p>My <a href="https://gcanti.github.io">blog</a></p>
          </div>
        </Col>
      </Row>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    return (
      <Row className="text-muted">
        <Col md={1}>
          <strong>Credits:</strong>
        </Col>
        <Col md={11}>
          <ul>
            <li>{tcombReactBootstrapRepo('tcomb-react-bootstrap')} <i>"Fast prototyping: Bootstrap + React.js + debugging support"</i></li>
            <li><a href="https://github.com/react-bootstrap/react-bootstrap">react-bootstrap</a> <i>"Bootstrap 3 components built with React"</i></li>
            <li><a href="http://facebook.github.io/react/index.html">React.js</a></li>
            <li><a href="http://getbootstrap.com">Bootstrap</a></li>
            <li><a href="https://github.com/gcanti/tcomb">tcomb</a> <i>"Pragmatic runtime type checking for JavaScript "</i></li>
            <li><a href="https://github.com/gcanti/tcomb-doc">tcomb-doc</a> <i>"Documentation tool for tcomb"</i></li>
          </ul>
        </Col>
      </Row>
    );
  }
});

var Code = React.createClass({
  render: function () {
    return (
      <div>
        <label>.jsx code (live reload)</label>
        <pre className="jsx-preamble">{JSX_PREAMBLE}</pre>
        <Input
          ref="code" 
          type="textarea" 
          value={this.props.value} 
          onChange={this.props.onChange}/>
      </div>
    );
  }
});

var Preview = React.createClass({
  render: function () {
    return (
      <div>{this.props.component}</div>
    );
  }
});

var Example = React.createClass({
  render: function () {
    return (
      <Input label="react-bootstrap examples" ref="example" type="select" defaultValue="Alert" onChange={this.props.onChange}>
        {options}
      </Input>
    );
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return {
      code: examples.Alert,
      name: 'Alert'
    };
  },
  eval: function (code) {
    try {
      var js = JSXTransformer.transform(code).code;
      return eval(js);
    } catch (e) {
      return getErrorAlert(e, this.state.name);
    }
  },
  onExampleChange: function (evt) {
    var value = evt.target.value;
    var code = examples[value];
    this.setState({code: code, name: value});
  },
  onCodeChange: function (evt) {
    var code = evt.target.value;
    this.setState({code: code, name: this.state.name});
  },
  onDebuggerChange: function (evt) {
    isDebuggerEnabled = evt.target.checked;
  },
  render: function () {
    var code = this.state.code;
    var component = this.eval(JSX_PREAMBLE + code);
    var debuggerLabel = <p><strong className="text-danger">Enable debugger</strong> <span className="text-muted">(remember to open up the console)</span></p>;
    return (
      <Grid>
        <Header/>
        <Row>
          <Col md={6}>
            <p className="lead">Insert code or choose an example</p>
            <Example onChange={this.onExampleChange}/>
            <Code value={code} onChange={this.onCodeChange}/>
            <Input type="checkbox" label={debuggerLabel} onChange={this.onDebuggerChange}/>
          </Col>
          <Col md={6}>
            <p className="lead">Preview</p>
            <Preview component={component}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2>How it works</h2>
            <p>No grammars, lexers or parsers were harmed for this experiment.</p>
            <p>The most part of this lightweight {tcombReactBootstrapRepo('library')} (around 400 total LOC) is the domain model describing the react-bootstrap components.</p>
            <p><b>Example</b>: This is the definition of the <code>Alert</code> component:</p>
            <pre>
<span className="comment">// runtime type checking</span><br/>
var t = require('tcomb');<br/><br/>
<span className="comment">// utils</span><br/>
var model = require('./util/model');<br/>
var BootstrapMixin = require('./util/BootstrapMixin');<br/><br/>
<span className="comment">// react-boostrap component</span><br/>
var Component = require('react-bootstrap/Alert');<br/>
<br/>
<span className="comment">// model definition</span><br/>
var Model = model.create('Alert', &#123;<br/>
  &nbsp;&nbsp;<b>onDismiss: t.maybe(t.Func),</b> &nbsp;<span className="comment">// means an optional function</span><br/>
  &nbsp;&nbsp;<b>dismissAfter: t.maybe(t.Num)</b> <span className="comment">// means an optional number</span><br/>
&#125;, [BootstrapMixin]); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="comment">// BootstrapMixin contains the definitions of bsClass, bsStyle, bsSize props</span><br/>
<br/>
<br/>
<span className="comment">// here is the heavy lifting:<br/>
// model.bind returns a function with the same signature of the react-bootstrap component.<br/>
// This new function checks the props types and then delegates the rendering to the react-bootstrap component</span><br/>
<b>module.exports = model.bind(Model, Component);</b>
            </pre>
            <h2>Yeah but I want to debug MY components too</h2>
            <p>For a quick solution you could instrument your code with asserts:</p>
            <pre>
var t = require('tcomb');<br/>
<br/>
/** @jsx React.DOM */<br/>
var MyComponent = React.createClass(&#123;<br/>
  &nbsp;&nbsp;render: function() &#123;<br/>
    <b>&nbsp;&nbsp;&nbsp;&nbsp;t.assert(t.Str.is(this.props.name), "ouch! bad name");</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;return (<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Hello &#123;this.props.name&#125;&lt;/h1&gt;<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;);<br/>
  &nbsp;&nbsp;}<br/>
&#125;);<br/>
            </pre>
          </Col>
        </Row>
        <hr/>
        <Footer/>
      </Grid>
    );
  }
});

//
// run
//
var main = <Main/>;
React.renderComponent(main, document.getElementById('app'));
