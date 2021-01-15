const getFileNameFromBlobUrl = (url) => {
  const fileNameWithExtension = url.substring(url.lastIndexOf("/") + 38);
  // return fileNameWithExtension.substring(0, fileNameWithExtension.length - 4);
  return fileNameWithExtension;
};

export { getFileNameFromBlobUrl };
