import React from 'react';
import { shallow } from 'enzyme';
import TableDialog from '../TableDialog';
import { mockMeetingTable } from '../../mocks/eventRoomMock';

describe('TableDialog test', () => {
  it('TableDialog should match snapshot', () => {
    const component = shallow(
      <TableDialog
        open={false}
        onClose={() => {}}
        onSubmit={() => {}}
        updateTable={mockMeetingTable}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
