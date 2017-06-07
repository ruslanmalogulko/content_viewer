import React from 'react';
import {findDOMNode} from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Root from '../containers/Root';

function mount(Component, props) {
  return renderIntoDocument(<Component { ...props } />);
}

// global.Object = {
//   extend: () => {},
//   prototype: {
//     toString: () => {return 'some text'}
//   }
// };

describe('Initial test', () => {
  it('should have root defined', () => {
    let component = mount(Root, {});
    let node =findDOMNode(component);
    expect(node.textContent).toBeDefined();
  });
});
