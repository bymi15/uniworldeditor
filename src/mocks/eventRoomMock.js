const mockEventRoom = {
  title: 'mockTitle',
  eventDate: new Date().toISOString(),
  meetingTables: [],
  background: 'mockBackground',
  scene: 'mockScene',
};

const mockEventRoomUpdate = {
  title: 'newMockTitle',
  eventDate: new Date().toISOString(),
  meetingTables: [],
  background: 'newMockBackground',
  scene: 'newMockScene',
};

const mockMeetingTable = {
  title: 'mockTitle',
  type: 'RoundMeetingTable',
  logoUrl: 'https://via.placeholder.com/150',
  zoomUrl: 'https://zoom.us/',
  posX: 0,
  posY: 0,
};

export { mockEventRoom, mockEventRoomUpdate, mockMeetingTable };
