export const Leagues = [
  { label: 'Ligue 1', value: 1 },
  { label: 'Premiere League', value: 2 },
  { label: 'Liga', value: 3 },
  { label: 'Ligue 2', value: 4 },
  { label: 'Serie A', value: 5 },
  { label: 'Ligue des Champions', value: 6 },
];

export const Positions: {
  [key: number]: { identifier: string; label: string };
} = {
  10: { identifier: 'G', label: 'Gardien' },
  20: { identifier: 'D', label: 'Défenseur' },
  21: { identifier: 'L', label: 'Latéral' },
  30: { identifier: 'MD', label: 'Milieu Défensif' },
  31: { identifier: 'MO', label: 'Milieu Offensif' },
  40: { identifier: 'A', label: 'Attaquant' },
};
