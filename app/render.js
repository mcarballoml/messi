import { FLAGS } from './teams.js';
import { formatToUserTime,getCountdown } from './utils/time.js';

function renderMatch(m,state) {
    const isActive = state.selectedTeam && (m.home === state.selectedTeam || m.away === state.selectedTeam);

  return `
<div class="match-row ${isActive ? "active" : ""}">
  <div class="match-top">
    <span class="team home">${m.home}</span>
    <span class="score">${m.result.home ?? "-"}</span>
    <span class="dash">-</span>
    <span class="score">${m.result.away ?? "-"}</span>
    <span class="team away">${m.away}</span>
  </div>

  <div class="match-bottom">
    <div class="match-countdown"> ${getCountdown(m.date)}</div>
    <div class="match-date"> ${formatToUserTime(m.date)}</div>
  </div>

</div>
  `;
}


function renderTeam(team, state) {
  const isSelected = state.selectedTeam === team;
  const stats = state.teamStats?.[team];

  return `
    <div class="team" data-team="${team}">
      <img
        class="flag ${isSelected ? "active" : ""}"
        data-team="${team}"
        src="https://flagcdn.com/w40/${FLAGS[team]}.png"
      />

      <span class="badge ${isSelected ? "active" : ""}" data-team="${team}">
        ${team} ${stats ? `(${stats.pts})` : ""}
      </span>
    </div>
  `;
}

export function renderGroups(state) {

  const grid = document.getElementById('groupsGrid');

  grid.innerHTML = "";

  Object.keys(state.groups).forEach((group) => {

      const groupMatches = state.matches.filter(m => m.group === group);
      const card = document.createElement('div');
      const isOpen = state.openGroups.has(group);
      const teams = state.scoreTable[group];

      card.className = 'card';

      card.innerHTML = `
      <h3>Group ${group}</h3>

      <div class="teams">
          ${teams.map(team => renderTeam(team.team, state)).join('')}
      </div>

      <div class="content ${isOpen ? "open" : ""}">
        ${groupMatches.map(m => renderMatch(m, state)).join('')}
      </div>
    `;

    card.onclick = () => {
      if (state.openGroups.has(group)) {
          state.openGroups.delete(group);
      } else {
          state.openGroups.add(group);
      }
      renderGroups(state);
    };

    const cardHasActive = state.selectedTeam && groupMatches.some(m => m.home === state.selectedTeam || m.away === state.selectedTeam);

    card.classList.toggle("dim", state.selectedTeam && !cardHasActive);

    card.querySelectorAll('.flag, .badge').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        selectTeam(el.dataset.team);
      });
    });

    grid.appendChild(card);
  });
}


export function renderCalendar(state) {

  const container = document.getElementById('calendar');

  const grouped = {};

  state.matches.forEach(m => {

    const day = formatToUserTime(m.date);

    if (!grouped[day]) grouped[day] = [];

    grouped[day].push(m);
  });

  container.innerHTML = Object.entries(grouped)
    .map(([day, matches]) => `
      <div class="calendar-day">
        <h4>${day}</h4>

        ${matches.map(m => `
          <div>
            ${m.home} vs ${m.away}
          </div>
        `).join('')}
      </div>
    `)
    .join('');
}