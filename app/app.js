import { state } from './state.js';
import { loadData } from './data.service.js';
import { renderGroups, renderCalendar } from './render.js';

async function init() {

  const data = await loadData();

  state.groups = data.groups;
  state.matches = data.matches;

  renderGroups(state);
  renderCalendar(state);
}

init();