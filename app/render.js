import { FLAGS } from './teams.js';
import { formatToUserTime,getCountdown } from './utils/time.js';

function renderMatch(m) {
  return `
<div class="match-row">
  <div class="match-top">
    <span class="team home">${m.home}</span>

    <span class="dash">-</span>
    <span class="score">-</span>
    <span class="dash">-</span>

    <span class="team away">${m.away}</span>
  </div>

  <div class="match-bottom">
    <span class="time">
      ${getCountdown(formatToUserTime(m.date))}
    </span>
  </div>

</div>
  `;
}

export function renderGroups(state) {

  const grid = document.getElementById('groupsGrid');

  grid.innerHTML = "";

  Object.entries(state.groups).forEach(([group, teams]) => {

    const groupMatches =
      state.matches.filter(m => m.group === group);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>Group ${group}</h3>

      <div class="teams">
        ${teams.map(team => `
          <div class="team">
            <img class="flag" src="https://flagcdn.com/w40/${FLAGS[team]}.png" />
            <span class="badge">${team}</span>
          </div>
        `).join('')}
      </div>

      <div class="content">
        ${groupMatches.map(renderMatch).join('')}
      </div>
    `;

    card.onclick = () => {
      card.querySelector('.content')
        .classList.toggle('open');
    };

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