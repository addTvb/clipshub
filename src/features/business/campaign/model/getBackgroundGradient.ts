export const getBackgroundGradient = (id: number) => {
  const backgrounds = [
    "/static/images/business/cards-bg/bg-orange.svg",
    "/static/images/business/cards-bg/bg-red.svg",
    "/static/images/business/cards-bg/bg-pink.svg",
    "/static/images/business/cards-bg/bg-green.svg",
    "/static/images/business/cards-bg/bg-blue.svg",
  ];

  // Use a large prime multiplier to spread consecutive IDs to different colors
  // 13 is a prime number that helps create separation between consecutive numbers
  const index = (id * 13) % backgrounds.length;

  return backgrounds[index];
};
