import sharp from 'sharp';
import fs from 'fs';

const tasks = [
  // artist-photo: shown at ~390x392 (card-img-top), 800x800 covers retina displays
  { input: 'public/images/artist-photo.PNG', output: 'public/images/artist-photo.webp', resize: { width: 800, height: 800 } },
  // splash-background-img: full-width hero, dimensions already reasonable, mainly needs PNG -> WebP
  { input: 'public/images/splash-background-img.png', output: 'public/images/splash-background-img.webp', resize: { width: 1600 } },
  // n-favicon: used as a 40x40 / 75x75 logo, 150x150 covers retina displays
  { input: 'public/images/n-favicon.png', output: 'public/images/n-favicon.webp', resize: { width: 150, height: 150 } },
  // arc-toroid: project card image in a 4-column grid, 800x800 covers retina displays
  { input: 'public/images/arc-toroid.png', output: 'public/images/arc-toroid.webp', resize: { width: 800, height: 800 } },
  // diffReact: project card image, same sizing as arc-toroid
  { input: 'public/images/diffReact.png', output: 'public/images/diffReact.webp', resize: { width: 800, height: 800 } },
  // purpleOrangeWidget: project card image, same sizing as arc-toroid
  { input: 'public/images/purpleOrangeWidget.png', output: 'public/images/purpleOrangeWidget.webp', resize: { width: 800, height: 800 } },
  // aetherLattice: project card image, same sizing as arc-toroid
  { input: 'public/images/aetherLattice.png', output: 'public/images/aetherLattice.webp', resize: { width: 800, height: 800 } },
  // fluxVortex: project card image, same sizing as arc-toroid
  { input: 'public/images/fluxVortex.png', output: 'public/images/fluxVortex.webp', resize: { width: 800, height: 800 } },
];

for (const task of tasks) {
  const before = fs.statSync(task.input).size;
  await sharp(task.input)
    .resize({ ...task.resize, fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(task.output);
  const after = fs.statSync(task.output).size;
  console.log(`${task.input}: ${(before / 1024).toFixed(1)} KiB -> ${task.output}: ${(after / 1024).toFixed(1)} KiB`);
}
