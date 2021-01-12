const backgrounds = [
  { value: "Default", label: "Default" },
  { value: "UclMainQuad", label: "UCL Main Quad" },
  { value: "UclPrintRoomCafe", label: "UCL Print Room Cafe" },
  { value: "Hall", label: "Hall" },
  { value: "TimesSquareNewYork", label: "Times Square New York" },
  { value: "RoyalOperaHouse", label: "Royal Opera House" },
  { value: "SydneyOperaHouseOutside", label: "Sydney Opera House Outside" },
  { value: "BritishLibraryOutside", label: "British Library Outside" },
  { value: "BritishMuseumOutside", label: "British Museum Outside" },
  { value: "EiffelTowerSunset", label: "Eiffel Tower Sunset" },
];

const scenes = [
  { value: "Default", label: "Default" },
  { value: "ConferenceHall", label: "Conference Hall" },
];

const findBackground = (value) => {
  const res = backgrounds.find((background) => background.value === value);
  if (res) {
    return res.label;
  }
  return value;
};

const findScene = (value) => {
  const res = scenes.find((scene) => scene.value === value);
  if (res) {
    return res.label;
  }
  return value;
};

export { backgrounds, scenes, findBackground, findScene };
