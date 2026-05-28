export function buildScoreTable(groups, matches) {
  const table = {};

  // 1. inicializar estructura
  for (const [groupName, teams] of Object.entries(groups)) {
  table[groupName] = teams.map(team => ({
    team,
    pts: 0,
    gf: 0,
    ga: 0,
    gd: 0
  }));
}

  // 2. lookup rápido team -> objeto acumulador
  const lookup = {};

  for (const groupName in table) {
    for (const teamObj of table[groupName]) {
      lookup[teamObj.team] = teamObj;
    }
  }

  // 3. procesar partidos
  for (const m of matches) {
    const r = m.result;

    const home = lookup[m.home];
    const away = lookup[m.away];

    if (!home || !away) continue;

    const homeGoals = r?.home;
    const awayGoals = r?.away;

    // si no jugado aún, ignorar
    if (homeGoals == null || awayGoals == null) continue;

    // goles a favor / en contra
    home.gf += homeGoals;
    home.ga += awayGoals;

    away.gf += awayGoals;
    away.ga += homeGoals;

    // puntos
    if (homeGoals > awayGoals) {
      home.pts += 3;
    } else if (awayGoals > homeGoals) {
      away.pts += 3;
    } else {
      home.pts += 1;
      away.pts += 1;
    }
  }

  // 4. diferencia de gol + orden
  for (const groupName in table) {
    table[groupName].forEach(t => {
      t.gd = t.gf - t.ga;
    });

    table[groupName].sort((a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.gf - a.gf
    );
  }

  return table;
}

export function flattenStats(scoreTable){
  const teamStats = {};
  for (const g in scoreTable) {
    for (const t of scoreTable[g]) {
      teamStats[t.team] = t;
    }
  }
  return teamStats;
}