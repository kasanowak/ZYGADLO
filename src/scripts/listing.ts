/**
 * Filtrowanie list i doładowywanie kolejnych pozycji („↓”).
 *
 * Kontener:   [data-listing data-page-size="10"]
 * Pozycja:    [data-item data-cat="malarstwo"]   (kilka kategorii rozdzielonych spacją)
 * Grupa:      [data-group="2019"]                 (opcjonalnie – np. lata w galerii)
 * Odnośnik:   [data-group-link="2019"]            (opcjonalnie – nawigacja po latach)
 * Filtry:     [data-filters data-param="kategoria"] a[data-filter]
 * Więcej:     [data-more]
 * Pusto:      [data-empty]
 */
function initListing(root: HTMLElement) {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-item]'));
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-group]'));
  const groupLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-group-link]'));
  const filtersNav = document.querySelector<HTMLElement>('[data-filters]');
  const filterLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-filter]'));
  const more = root.querySelector<HTMLButtonElement>('[data-more]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const pageSize = Number(root.dataset.pageSize || 0);
  const param = filtersNav?.dataset.param || 'kategoria';

  const valid = new Set(filterLinks.map((a) => a.dataset.filter));
  const fromUrl = new URLSearchParams(location.search).get(param);
  let current = fromUrl && valid.has(fromUrl) ? fromUrl : 'wszystkie';
  let limit = pageSize || Infinity;

  const matches = (el: HTMLElement) =>
    current === 'wszystkie' || (el.dataset.cat || '').split(' ').includes(current);

  function render() {
    const matching = items.filter(matches);
    items.forEach((el) => (el.hidden = true));
    matching.slice(0, limit).forEach((el) => (el.hidden = false));

    groups.forEach((g) => {
      g.hidden = !g.querySelector('[data-item]:not([hidden])');
    });
    groupLinks.forEach((a) => {
      const g = groups.find((x) => x.dataset.group === a.dataset.groupLink);
      const li = a.closest('li') || a;
      li.hidden = !g || g.hidden;
    });

    if (more) {
      const wrap = (more.closest('.more') as HTMLElement) || more;
      wrap.hidden = matching.length <= limit;
    }
    if (empty) empty.hidden = matching.length > 0;

    filterLinks.forEach((a) => {
      const active = a.dataset.filter === current;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  filterLinks.forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      current = a.dataset.filter || 'wszystkie';
      limit = pageSize || Infinity;
      const url = new URL(location.href);
      if (current === 'wszystkie') url.searchParams.delete(param);
      else url.searchParams.set(param, current);
      history.replaceState(null, '', url);
      render();
    }),
  );

  more?.addEventListener('click', () => {
    const firstHidden = items.filter(matches)[limit];
    limit += pageSize || Infinity;
    render();
    firstHidden?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  });

  render();
}

document.querySelectorAll<HTMLElement>('[data-listing]').forEach(initListing);
