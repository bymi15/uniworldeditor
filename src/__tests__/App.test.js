import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App test', () => {
  test('should match snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
