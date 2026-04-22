const transfer_to_vnd = (amount: number) => {
  return amount * 26400;
};
export const Data_Accessory = [
  {
    question: "What are you interested in?",
    options: [
      "Handbag",
      "Hair Clip",
      "Necklace",
      "Ring",
      "Bracelet",
      "Earrings",
    ],
  },
  {
    question: "how much are you willing to spend?",
    options: [
      { label: "Under $50", value_min: 0, value_max: transfer_to_vnd(50) },
      {
        label: "$50 - $100",
        value_min: transfer_to_vnd(50),
        value_max: transfer_to_vnd(100),
      },
      {
        label: "$100 - $200",
        value_min: transfer_to_vnd(100),
        value_max: transfer_to_vnd(200),
      },
      {
        label: "$200 - $300",
        value_min: transfer_to_vnd(200),
        value_max: transfer_to_vnd(300),
      },
      {
        label: "$300 - $500",
        value_min: transfer_to_vnd(300),
        value_max: transfer_to_vnd(500),
      },
      {
        label: "Any Budget",
        value_min: transfer_to_vnd(0),
        value_max: Infinity,
      },
    ],
  },
];
