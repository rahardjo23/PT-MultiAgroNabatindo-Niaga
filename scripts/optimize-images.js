import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/images-optimized');

// Quality settings
const QUALITY = {
  jpeg: 80,
  png: 85,
  webp: 80
};

async function optimizeImage(inputPath, filename) {
  const outputPath = path.join(OUTPUT_DIR, filename);
  const ext = path.extname(filename).toLowerCase();

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Optimizing ${filename}...`);

    // Optimize based on file type
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg({ quality: QUALITY.jpeg, progressive: true })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await image
        .png({ quality: QUALITY.png, compressionLevel: 9 })
        .toFile(outputPath);
    }

    // Also create WebP version for modern browsers
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await sharp(inputPath)
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath);

    // Get file sizes
    const originalSize = (await fs.stat(inputPath)).size;
    const optimizedSize = (await fs.stat(outputPath)).size;
    const webpSize = (await fs.stat(webpPath)).size;

    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`  Optimized ${ext}: ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    console.log(`  WebP: ${(webpSize / 1024).toFixed(1)}KB (${webpSavings}% smaller)`);

  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error.message);
  }
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Read all files from images directory
    const files = await fs.readdir(IMAGES_DIR);

    // Filter image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to optimize\n`);

    // Optimize all images
    for (const file of imageFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      await optimizeImage(inputPath, file);
      console.log('');
    }

    console.log('✓ Image optimization complete!');
    console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
    console.log('\nNext steps:');
    console.log('1. Review the optimized images');
    console.log('2. If satisfied, replace the original images: npm run images:replace');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
