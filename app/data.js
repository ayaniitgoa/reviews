export const reviewData = {
  groups: {
    Healthcare: {
      default: "Hospitals",
      categories: {
        Hospitals: [
          { id: 1, name: "Sterling Hospital", rating: 4.5, reviews: 124 },
          { id: 2, name: "XYZ Hospital", rating: 3.3, reviews: 87 },
        ],
        Clinics: [{ id: 3, name: "City Clinic", rating: 4.2, reviews: 56 }],
      },
    },
    Sports: {
      default: "Cricket",
      categories: {
        Cricket: [
          { id: 4, name: "ABC Cricket Academy", rating: 4.7, reviews: 203 },
        ],
      },
    },
  },
};
