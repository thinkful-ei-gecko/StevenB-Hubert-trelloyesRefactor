import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import renderer from 'react-test-renderer';

describe( 'List component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List key={234} header='First list' cards={[2, 4, 5]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(<List key={243} header='First list' cards={[2, 5, 8]}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});