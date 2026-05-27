export async function loadData() {

  const groups = await fetch('./data/groups.json')
    .then(r => r.json());

  const matches = await fetch('./data/matches.json')
    .then(r => r.json());

  return { groups, matches };
}