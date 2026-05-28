/* ============================================================
   BENEATH THE SURFACE — Shark Attacks in Australia
   main.js — loads all graph specs from graph/ folder
             and embeds them into the page
   ============================================================ */

const EMBED_OPTS = { actions: false, renderer: 'svg' };

/**
 * Load a JSON spec file and embed it into a DOM element.
 * @param {string} specFile  - path to the JSON spec (e.g. 'grah/01_choropleth.json')
 * @param {string} elementId - id of the target div (e.g. 'vis-map')
 */
async function loadAndEmbed(specFile, elementId) {
  try {
    const res  = await fetch(specFile);
    const spec = await res.json();
    await vegaEmbed(`#${elementId}`, spec, EMBED_OPTS);
  } catch (err) {
    console.error(`Failed to load ${specFile}:`, err);
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = `<p style="color:#e05c4a;padding:16px;">Chart failed to load: ${specFile}</p>`;
  }
}

/* ---- Embed all 14 charts in order ---- */
document.addEventListener('DOMContentLoaded', () => {

  loadAndEmbed('graph/01_choropleth.json',    'vis-map');
  loadAndEmbed('graph/02_dotmap.json',         'vis-dotmap');
  loadAndEmbed('graph/03_state_bar.json',      'vis-state-bar');
  loadAndEmbed('graph/04_species.json',        'vis-species');
  loadAndEmbed('graph/05_provoked.json',       'vis-provoked');
  loadAndEmbed('graph/06_gender.json',         'vis-gender');
  loadAndEmbed('graph/07_activity.json',       'vis-activity');
  loadAndEmbed('graph/08_body_part.json',      'vis-body');
  loadAndEmbed('graph/09_month_radial.json',   'vis-month');
  loadAndEmbed('graph/10_timeofday.json',      'vis-timeofday');
  loadAndEmbed('graph/11_timeline.json',       'vis-timeline');
  loadAndEmbed('graph/12_fatality_trend.json', 'vis-fatality-trend');
  loadAndEmbed('graph/13_heatmap.json',        'vis-heatmap');
  loadAndEmbed('graph/14_treemap.json',        'vis-treemap');

  /* ---- Reading progress bar ---- */
  window.addEventListener('scroll', () => {
    const el  = document.documentElement;
    const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
  });

  /* ---- Scroll fade-in ---- */
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.07 }
  );
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});
