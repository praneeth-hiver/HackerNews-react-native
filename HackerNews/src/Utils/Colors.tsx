const Colors = {
  background: (a = 1) => {
    return `rgba(245,245,255,${a})`;
  },
  icon: (a = 1) => {
    return `rgba(0,0,0,${a})`;
  },
  fontColor: (a = 1) => {
    return 1 == 1 ? `rgba(0,10,0,${a})` : `rgba(245,255,245,${a})`;
  },
  shadowColor: (a = 1) => {
    return `rgba(0,0,0,${a})`;
  },
  cardColor: () => [
    "#9FBCC2",
    "#AFC7BF",
    "#C7CFC0",
    "#DDD6CA",
    "#EEDFDA",
    "#9FBCC2"
  ]
};

export default Colors;
