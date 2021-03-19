import React from 'react';
import { shallow } from 'enzyme';
import EventRoomForm from '../EventRoomForm';
import { mockEventRoomUpdate } from '../../mockData/eventRoomMock';
import BlobService from '../../services/BlobService';
jest.mock('../../services/BlobService');

describe('EventRoomForm test', () => {
  const mockUseEffect = () => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  };

  it('should match snapshot', () => {
    const component = shallow(
      <EventRoomForm
        onSubmit={() => {}}
        submitText='mockText'
        updateEventRoom={mockEventRoomUpdate}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch backgrounds from blob service on load', () => {
    mockUseEffect();
    shallow(<EventRoomForm onSubmit={() => {}} submitText='mockText' />);
    expect(BlobService.get).toBeCalledWith('backgrounds');
  });
});
