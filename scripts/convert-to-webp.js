/**
 * Image to WebP Conversion Script
 * Converts all JPEG, JPG, and PNG images to WebP format
 * WebP provides 25-35% smaller file sizes with same quality
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const supportedFormats = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 }) // 85 quality, maximum compression effort
      .toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const saved = ((1 - outputStats.size / inputStats.size) * 100).toFixed(2);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${(inputStats.size / 1024).toFixed(2)} KB → ${(outputStats.size / 1024).toFixed(2)} KB (${saved}% smaller)\n`);
    
    return { success: true, saved: parseFloat(saved), inputSize: inputStats.size, outputSize: outputStats.size };
  } catch (error) {
    console.error(`❌ Failed to convert ${path.basename(inputPath)}:`, error.message);
    return { success: false, saved: 0, inputSize: 0, outputSize: 0 };
  }
}

async function convertAllImages() {
  console.log('🚀 Starting image conversion to WebP...\n');
  console.log(`📁 Directory: ${assetsDir}\n`);
  
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return supportedFormats.includes(ext);
  });
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found to convert.');
    return;
  }
  
  console.log(`📸 Found ${imageFiles.length} images to convert\n`);
  console.log('─'.repeat(60) + '\n');
  
  let totalInputSize = 0;
  let totalOutputSize = 0;
  let successCount = 0;
  let failCount = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    const result = await convertToWebP(inputPath, outputPath);
    
    if (result.success) {
      successCount++;
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
    } else {
      failCount++;
    }
  }
  
  console.log('─'.repeat(60) + '\n');
  console.log('📊 CONVERSION SUMMARY\n');
  console.log(`✅ Successfully converted: ${successCount} images`);
  if (failCount > 0) console.log(`❌ Failed: ${failCount} images`);
  console.log(`📦 Total size before: ${(totalInputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Total size after:  ${(totalOutputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Total saved:       ${((totalInputSize - totalOutputSize) / 1024 / 1024).toFixed(2)} MB (${((1 - totalOutputSize / totalInputSize) * 100).toFixed(2)}%)\n`);
  
  console.log('🎉 Conversion complete!');
  console.log('📝 Next steps:');
  console.log('   1. Update import statements in your code to use .webp extensions');
  console.log('   2. Delete old image files after verification');
  console.log('   3. Rebuild your project: npm run build\n');
}

convertAllImages().catch(console.error);
