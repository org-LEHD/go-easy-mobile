const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" },
];
// Replace with api
export const initialMarkers = {
  markers: [
    {
      coords: { latitude: 55.680594, longitude: 12.504901 },
      title: "P. G. Ramms Allé rundkørsel",
      image: Images[2],
      id: 1,
      category: "Museum",
    },
    {
      coords: { latitude: 55.6802824, longitude: 12.5065854 },
      title: "Lindevangskolen",
      image: Images[1],
      id: 2,
      category: "Restaurant",
    },
    {
      coords: { latitude: 55.680243, longitude: 12.511349 },
      title: "Lindevangsparken",
      image: Images[0],
      id: 3,
      category: "Restaurant",
    },
    {
      coords: { latitude: 55.69225938580311, longitude: 12.495259665695695 },
      title: "Skibelundvej 9",
      description: "This is the best place in Portland",
      image: Images[2],
      id: 7,
      distance: 0,
      category: "Restaurant",
    },
    {
      coords: { latitude: 55.827758, longitude: 12.251114 },
      title: "Rosenlundvej 12",
      description: "This is the best place in Portland",
      image: Images[2],
      id: 8,
      distance: 0,
      category: "Restaurant",
    },
    {
      coords: { latitude: 55.827324, longitude: 12.248818 },
      title: "Rosenlundvej 27",
      description: "This is the best place in Portland",
      image: Images[2],
      id: 9,
      distance: 0,
      category: "Restaurant",
    },
    {
      coords: { latitude: 55.827564, longitude: 12.252668 },
      title: "Rosenlundvej 10",
      description: "This is the best place in Portland",
      image: Images[1],
      id: 10,
      distance: 0,
      category: "Restaurant",
    },
  ],
};
