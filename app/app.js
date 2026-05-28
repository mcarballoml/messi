import { state } from './state.js';
import { loadData } from './data.service.js';
import { renderGroups, renderCalendar } from './render.js';

window.selectTeam = (team) => {
  state.selectedTeam =
    state.selectedTeam === team ? null : team;
  renderGroups(state);
};

async function init() {

  const data = await loadData();

  state.groups = data.groups;
  state.matches = data.matches;
  state.openGroups = new Set();

  renderGroups(state);
  renderCalendar(state);
}

init();