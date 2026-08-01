const DEFAULT_MARGIN = '0px 0px -20% 0px';

const groups = new Map();

document.querySelectorAll('[data-reveal]').forEach(target => {
  const margin = target.dataset.revealMargin || DEFAULT_MARGIN;
  const group = groups.get(margin);

  if (group) {
    group.push(target);
    return;
  }

  groups.set(margin, [target]);
});

groups.forEach((targets, rootMargin) => {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.dataset.reveal = 'visible';
        instance.unobserve(entry.target);
      });
    },
    { rootMargin }
  );

  targets.forEach(target => observer.observe(target));
});
