import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPTIMIZED_DIR = path.join(__dirname, '../src/assets/images-optimized');
const TARGET_DIR = path.join(__dirname, '../src/assets/images');
const BACKUP_DIR = path.join(__dirname, '../src/assets/images-backup');

async function replaceImages() {
  try {
    console.log('Starting image replacement...\n');

    // Create backup directory
    console.log('Creating backup of original images...');
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Read optimized images
    const files = await fs.readdir(OPTIMIZED_DIR);

    let replaced = 0;
    for (const file of files) {
      const optimizedPath = path.join(OPTIMIZED_DIR, file);
      const targetPath = path.join(TARGET_DIR, file);
      const backupPath = path.join(BACKUP_DIR, file);

      try {
        // Check if original exists
        await fs.access(targetPath);

        // Backup original
        await fs.copyFile(targetPath, backupPath);

        // Replace with optimized
        await fs.copyFile(optimizedPath, targetPath);

        console.log(`✓ Replaced: ${file}`);
        replaced++;
      } catch (error) {
        if (error.code === 'ENOENT') {
          // Original doesn't exist, just copy optimized
          await fs.copyFile(optimizedPath, targetPath);
          console.log(`✓ Added: ${file}`);
          replaced++;
        } else {
          console.error(`✗ Error with ${file}:`, error.message);
        }
      }
    }

    console.log(`\n✓ Image replacement complete!`);
    console.log(`  ${replaced} images replaced/added`);
    console.log(`\nBackup saved to: ${BACKUP_DIR}`);
    console.log('You can now delete the images-optimized folder if everything looks good.');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

replaceImages();
