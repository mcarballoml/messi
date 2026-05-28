import { state } from './state.js';
import { loadData } from './data.service.js';
import { renderGroups, renderCalendar } from './render.js';

window.selectTeam = (team) => {
  const isSame = state.selectedTeam === team;
  state.selectedTeam = isSame ? null : team;

  if (!isSame) {
    const group = state.teamToGroup[team];
    state.openGroups.add(group);
  }

  renderGroups(state);
};
async function init() {

  const data = await loadData();

  state.groups = data.groups;
  state.matches = data.matches;
  state.openGroups = new Set();

  state.teamToGroup = {};
  for (const group in state.groups) {
    const teams = state.groups[group];
    for (const team of teams) {
      state.teamToGroup[team] = group;
    }
  }

  renderGroups(state);
  renderCalendar(state);
}

init();