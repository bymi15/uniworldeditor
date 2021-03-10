import React from 'react';
import { shallow } from 'enzyme';
import LectureRoomForm from '../LectureRoomForm';
import { mockLectureRoomUpdate } from '../../mocks/lectureRoomMock';

describe('LectureRoomForm test', () => {
  it('LectureRoomForm should match snapshot', () => {
    const component = shallow(
      <LectureRoomForm
        onSubmit={() => {}}
        submitText='mockText'
        updateLectureRoom={mockLectureRoomUpdate}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
