UPDATE projects SET
  project_name = 'Arc Toroid',
  img_url = '/images/arc-toroid.webp',
  project_description = 'Generative 3D toroidal form — Processing sketch series',
  quantity = 1000,
  price_eth = 0.5,
  open_date_gmt = '2026-06-01 09:00:00',
  royalty_percent = 7,
  artist_name = 'masterNordak',
  active = 1
WHERE id = 1;

UPDATE projects SET
  project_name = 'Aether Lattice',
  img_url = '/images/aetherLattice.webp',
  project_description = 'Generative fractal crystal network seeded p5.js-style sketch series'
WHERE id = 2;

UPDATE projects SET
  project_name = 'Flux Vortex',
  img_url = '/images/fluxVortex.webp',
  project_description = 'Seeded generative flow-field vortex formed from glowing particle trails, ember light, and violet turbulence.'
WHERE id = 3;

