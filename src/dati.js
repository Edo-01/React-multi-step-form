const plans = [
  {
    id: 0,
    img: "./src/assets/images/icon-arcade.svg",
    type: "arcade",
    costoMese: 9,
    costoAnno: 90,
  },
  {
    id: 1,
    img: "./src/assets/images/icon-advanced.svg",
    type: "advanced",
    costoMese: 12,
    costoAnno: 120,
  },
  {
    id: 2,
    img: "./src/assets/images/icon-pro.svg",
    type: "pro",
    costoMese: 15,
    costoAnno: 150,
  },
];

const addOn = [
  {
    id: 0,
    type: "online service",
    description: "Access to multiplayer games",
    costoMese: 1,
    costoAnno: 10,
    active: true,
  },
  {
    id: 1,
    type: "larger storage",
    description: "Extra 1TB of cloud save",
    costoMese: 2,
    costoAnno: 20,
    active: true,
  },
  {
    id: 2,
    type: "customizable profile",
    description: "Custom theme on your profile",
    costoMese: 2,
    costoAnno: 20,
    active: false,
  },
];

export { plans, addOn };
