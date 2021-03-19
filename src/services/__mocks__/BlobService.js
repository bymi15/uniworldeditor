const BlobService = {
  get: jest.fn(() => Promise.resolve({ test: 'hello' })),
  upload: jest.fn(Promise.resolve()),
  delete: jest.fn(Promise.resolve()),
  deleteSlides: jest.fn(Promise.resolve()),
};

export default BlobService;
