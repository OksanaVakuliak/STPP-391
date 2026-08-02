const DEFAULT_MARGIN = '0px';
const DEFAULT_THRESHOLD = 0.2;

const groups = new Map();

document.querySelectorAll('[data-reveal]').forEach(target => {
  const rootMargin = target.dataset.revealMargin || DEFAULT_MARGIN;
  const threshold = Number(target.dataset.revealThreshold ?? DEFAULT_THRESHOLD);
  const key = `${rootMargin}|${threshold}`;
  const group = groups.get(key);

  if (group) {
    group.targets.push(target);
    return;
  }

  groups.set(key, { rootMargin, threshold, targets: [target] });
});

groups.forEach(({ rootMargin, threshold, targets }) => {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.dataset.reveal = 'visible';
        instance.unobserve(entry.target);
      });
    },
    { rootMargin, threshold }
  );

  targets.forEach(target => observer.observe(target));
});
