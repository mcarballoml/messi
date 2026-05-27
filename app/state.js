export const state = {
  groups: {},
  matches: [],
  selectedTeam: null,
  selectedDay: null,
  view: "groups",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
};