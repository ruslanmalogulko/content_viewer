import React from 'react';
import { shallow } from 'enzyme';
import Root from '../containers/Root';

function setup() {
  const props = {};
  const enzymeWrapper = shallow(<Root />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Initial test', () => {
  it('should have root defined', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toBeDefined();
  });
});
