const mockLectureRoom = {
  title: 'mockTitle',
  module: 'mockModule',
  lecturer: 'mockLecturer',
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  firstSlideUrl: 'mockUrl',
  numSlides: 1,
};

const mockLectureRoomUpdate = {
  title: 'newMockTitle',
  module: 'newMockModule',
  lecturer: 'newMockLecturer',
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  firstSlideUrl: 'newMockUrl',
  numSlides: 3,
};

export { mockLectureRoom, mockLectureRoomUpdate };
