import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  test('should correctly render', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});
