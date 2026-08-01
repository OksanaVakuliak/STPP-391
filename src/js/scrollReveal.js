const targets = document.querySelectorAll('[data-reveal]');

if (targets.length) {
  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.dataset.reveal = 'visible';
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach(target => observer.observe(target));
}
