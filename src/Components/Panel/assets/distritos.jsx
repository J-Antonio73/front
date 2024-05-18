export const distritosManzanillo = [
  { id: 0, name: 'Todos' },
  ...Array.from({ length: 199 }, (_, i) => ({
    id: i + 1,
    name: (i + 1).toString()
  }))
];
