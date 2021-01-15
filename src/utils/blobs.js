const getFileNameFromBlobUrl = (url) => {
  return url.substring(url.lastIndexOf("/") + 38);
};

export { getFileNameFromBlobUrl };
