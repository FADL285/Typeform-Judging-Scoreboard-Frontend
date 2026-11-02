// Guard publications from replaced requests and unmounted views.
export function createLoadGuard() {
  let generation = 0;
  let active = true;
  return {
    begin() { const current = ++generation; return () => active && current === generation; },
    stop() { active = false; generation++; },
  };
}
