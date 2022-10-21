const names = [
  'Apple',
  'Andy',
  'Alex',
  'Brock',
  'Billy',
  'Charlie',
  'Christina',
  'Carole',
  'Ellen',
  'Matt',
  'Darwin',
  'Jet',
  'Otis',
  'Lupa',
  'Tiger',
  'Gunner',
  'Rokko',
  'Tibbles',
  'Diego',
  'Mike',
  'Janis',
  'Katie',
  'Lindsay',
  'Kurt',
  'Lenny',
  'Carl',
  'Homer',
  'Nelson',
  'Bart',
  'Pat',
  'Sam',
];

const thoughts = [
  'Cool beans',
  'Good thought',
  'I agree',
  'This place is cold',
  'I like to run',
  'Blank space',
  "These are just random words I'm typing",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUserName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomThoughts = () => `${getRandomArrItem(thoughts)}`;

module.exports = { getRandomUserName, getRandomThoughts };
