import React from 'react';
import { shallow } from 'enzyme';
import TableGridEditor from '../TableGridEditor';
import { mockMeetingTable } from '../../mocks/eventRoomMock';

describe('TableGridEditor test', () => {
  it('TableGridEditor should match snapshot', () => {
    const component = shallow(
      <TableGridEditor
        tables={[mockMeetingTable]}
        updateMeetingTables={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('TableGridEditor should match snapshot with empty tables array', () => {
    const component = shallow(
      <TableGridEditor tables={[]} updateMeetingTables={() => {}} />
    );
    expect(component).toMatchSnapshot();
  });
});
