(function () {
  const sections = document.querySelectorAll('.job-listings');
  if (!sections.length) return;

  sections.forEach((root) => {
    const searchInput = root.querySelector('[data-jobs-search]');
    const filterSelects = root.querySelectorAll('[data-jobs-filter]');
    const jobs = root.querySelectorAll('[data-job]');
    const countEl = root.querySelector('[data-jobs-count-number]');
    const emptyEl = root.querySelector('[data-jobs-empty]');

    const applyFilters = () => {
      const query = (searchInput?.value || '').trim().toLowerCase();
      const filters = {};
      filterSelects.forEach((sel) => {
        filters[sel.dataset.jobsFilter] = sel.value;
      });

      let visible = 0;
      jobs.forEach((job) => {
        const title = job.dataset.jobTitle || '';
        const matchesQuery = !query || title.includes(query);
        const matchesDepartment = !filters.department || job.dataset.jobDepartment === filters.department;
        const matchesLocation = !filters.location || job.dataset.jobLocation === filters.location;
        const matchesRemote = !filters.remote || job.dataset.jobRemote === filters.remote;
        const matchesEmployment = !filters.employment || job.dataset.jobEmployment === filters.employment;

        const show = matchesQuery && matchesDepartment && matchesLocation && matchesRemote && matchesEmployment;
        job.hidden = !show;
        if (show) visible += 1;
      });

      if (countEl) countEl.textContent = String(visible);
      if (emptyEl) emptyEl.hidden = visible !== 0;
    };

    if (searchInput) searchInput.addEventListener('input', applyFilters);
    filterSelects.forEach((sel) => sel.addEventListener('change', applyFilters));
  });
})();
