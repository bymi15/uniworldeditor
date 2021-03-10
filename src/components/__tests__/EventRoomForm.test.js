import React from 'react';
import { shallow } from 'enzyme';
import EventRoomForm from '../EventRoomForm';
import { mockEventRoomUpdate } from '../../mocks/eventRoomMock';

describe('EventRoomForm test', () => {
  it('EventRoomForm should match snapshot', () => {
    const component = shallow(
      <EventRoomForm
        onSubmit={() => {}}
        submitText='mockText'
        updateEventRoom={mockEventRoomUpdate}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
