// simple-sequential-upload.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: 'dokgl6bfp',
  api_key: '824439276387255',  // Replace with your actual API key
  api_secret: 'HgMNRom67gMBvkyHXpAjAC72OWc'  // Replace with your actual API secret
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function uploadAllImages() {
  // Your package data - update this with ALL your packages
  const packages = [
    { id: 92, old_url: 'public/uploads/1753849721_dubai-thumb-museum3.jpg', title: 'Amazing Dubai' },
    { id: 94, old_url: 'public/uploads/1753854474_thumb13 (1).jpg', title: 'Sweet Pattaya, Thailand' },
    { id: 99, old_url: 'public/uploads/1753854170_goa-thumb-21.jpg', title: 'Goa' },
    { id: 100, old_url: 'public/uploads/1753856025_malaysia-thumb-2.jpg', title: 'Magical Malaysia' },
    { id: 101, old_url: 'public/uploads/1753856254_Japan-Thumbnail.jpg', title: 'Discover The Beauty Of Japan' },
    { id: 102, old_url: 'public/uploads/1753856594_thumb_(2)1.jpg', title: 'Hong Kong + Disneyland' },
    { id: 103, old_url: 'public/uploads/1753856981_Philippines-Discovery-Trail-thumbnail.jpg', title: 'Philippines Discovery Trail' },
    { id: 104, old_url: 'public/uploads/1753857333_kashmir-sightseeing.jpg', title: 'Paradise Kashmir' },
    { id: 105, old_url: 'public/uploads/1753857452_leh-thumb-12.jpg', title: 'Leh Ladakh' },
    { id: 106, old_url: 'public/uploads/1753857957_Panoramic_Switzerland_-Thumbnail.jpg', title: 'Panoramic Switzerland' },
    { id: 108, old_url: 'public/uploads/1755857607_WhatsApp Image 2025-08-22 at 3.23.33 PM.jpeg', title: 'Bali & Gili Gateway' },
    { id: 109, old_url: 'public/uploads/1755860202_WhatsApp Image 2025-08-22 at 4.06.14 PM.jpeg', title: 'Discover Saigon Vietnam' },
    { id: 111, old_url: 'public/uploads/1755861240_WhatsApp Image 2025-08-22 at 4.38.36 PM.jpeg', title: 'Discover wonders of Turkey' },
    { id: 112, old_url: 'public/uploads/1755929645_WhatsApp Image 2025-08-23 at 11.43.39 AM.jpeg', title: 'Cameron Highlands + Kuala Lumpur' },
    { id: 113, old_url: 'public/uploads/1755930785_WhatsApp Image 2025-08-23 at 12.01.55 PM.jpeg', title: 'Dreamland Singapore' },
    { id: 114, old_url: 'public/uploads/1755933632_WhatsApp Image 2025-08-23 at 12.24.08 PM.jpeg', title: ' Bali & Nusa Lembongan' },
    { id: 115, old_url: 'public/uploads/1755935088_WhatsApp Image 2025-08-23 at 1.07.51 PM.jpeg', title: 'Hong Kong' },
    { id: 116, old_url: 'public/uploads/1755935886_WhatsApp Image 2025-08-23 at 1.27.41 PM.jpeg', title: 'Kuala Lumpur+Langkawi Escape' },
    { id: 117, old_url: 'public/uploads/1755937118_WhatsApp Image 2025-08-23 at 1.47.53 PM.jpeg', title: 'Istanbul to Kusadasi' },
    { id: 118, old_url: 'public/uploads/1756120800_WhatsApp Image 2025-08-25 at 4.40.26 PM.jpeg', title: 'SOUTH AFRICA' },
    { id: 119, old_url: 'public/uploads/1756121343_innerbannner_(2)2.jpg', title: 'Malaysia + Singapore Delight' },
    { id: 120, old_url: 'public/uploads/1756122036_SingaporeCruise.jpg', title: 'Singapore-Genting Dream' },
    { id: 121, old_url: 'public/uploads/1756122968_innerbanner4.jpg', title: 'Swiss And Paris' },
    { id: 122, old_url: 'public/uploads/1756123675_vietnam-banner-long.jpg', title: 'Vibrant Vietnam' },
    { id: 123, old_url: 'public/uploads/1756124256_zurich-banner1.jpg', title: 'Unforgettable Zurich' },
    { id: 124, old_url: 'public/uploads/1756189086_innerbannner_(1)3.jpg', title: 'Best of Bali & Malaysia' },
    { id: 125, old_url: 'public/uploads/1756190439_Rctrips-inner-banner.webp', title: 'Discover Bali ' },
    { id: 126, old_url: 'public/uploads/1756193989_kerala-thumb.jpg', title: 'Kerala' },
    { id: 127, old_url: 'public/uploads/1756455788_Rctript-old-PKG-Thumbnail_(1).jpg', title: 'Amazing Singapore' },
    { id: 128, old_url: 'public/uploads/1756467549_innerbanner8.jpg', title: 'Japan ' },
    { id: 129, old_url: 'public/uploads/1756468555_egyptinnerbanner.jpg', title: 'EGYPT' },
    { id: 130, old_url: 'public/uploads/1756469173_vaishno-devi-thumb-compress.png', title: 'Kashmir And Vaishno Devi' },
    { id: 131, old_url: 'public/uploads/1756469752_kashmir-sightseeing.jpg', title: 'Kashmir' },
    { id: 132, old_url: 'public/uploads/1756470199_ayodhya-mandir-banner-1111.jpg', title: 'Ayodhya Ram Mandir' },
    { id: 133, old_url: 'public/uploads/1756470627_golden-temple.jpg', title: 'Golden Temple' },
    { id: 134, old_url: 'public/uploads/1756545131_638144908332559663.jpg', title: 'Gangtok Lachung Pelling Darjeeling' },
    { id: 135, old_url: 'public/uploads/1756546591_638147570161984293.jpg', title: 'Nainital Corbett Mussoorie Haridwar' },
    { id: 136, old_url: 'public/uploads/1756547106_638144895278445600.jpg', title: 'Shimla Manali Dalhousie' },
    { id: 137, old_url: 'public/uploads/1756548046_638152680725516245.jpg', title: 'Nepal ' },
    { id: 139, old_url: 'public/uploads/1756711415_Rctrips-inner-banner.jpg', title: 'Singapore Genting Cruise' },
    { id: 140, old_url: 'public/uploads/1756712632_SightSeeing1BJYio.jpg', title: 'Grand Wonders Of Europe' },
    { id: 141, old_url: 'public/uploads/1756713159_SightSeeing4i6OyC.jpg', title: 'Scenic Europe' },
    { id: 142, old_url: 'public/uploads/1756719078_SightSeeingAHlVHQ.jpg', title: 'Grand Fascinating Europe' },
    { id: 143, old_url: 'public/uploads/1756720014_SightSeeing5qZcJf.jpg', title: 'European Grand Adventure' },
    { id: 145, old_url: 'public/uploads/1757307792_li98rjzsliulbzpzb6h53jx6xuy8_1595835642_shutterstock_422601400.avif', title: 'Canada Tour Package ' },
    { id: 147, old_url: 'public/uploads/1757308812_zl82i3pffpdgnywh5wzrqe7be186_Prague__Vienna_and_Budapest_Tour_13.avif', title: 'Prague Vienna and Budapest Tour Package' },
    { id: 148, old_url: 'public/uploads/1757310262_rypis72dlllnger9vdgui6nglqc9_bfcccb3b-0736-40dc-82bb-adb09559d9be.avif', title: 'Spectacular Central Europe Tour' },
    { id: 149, old_url: 'public/uploads/1757337067_Feature-Image-_-pondicherry.avif', title: 'Pondicherry Kanchipuram Mahabalipuram' },
    { id: 150, old_url: 'public/uploads/1757414992_Mumbai1[1].webp', title: 'Best of Maharashtra Package: Mumbai, Lonavala, Khandala & More' },
    { id: 151, old_url: 'public/uploads/1757415942_Screenshot 2025-09-09 163353.png', title: 'Manali Tour ' },
  ];
  
  console.log(`Uploading ${packages.length} images sequentially...\n`);
  
  const results = [];
  
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    console.log(`[${i + 1}/${packages.length}] Uploading: ${pkg.title} (ID: ${pkg.id})`);
    
    try {
      // Use path relative to where script is run from
      const localPath = path.join(process.cwd(), pkg.old_url);
      
      if (!fs.existsSync(localPath)) {
        console.log(`❌ File not found: ${localPath}`);
        results.push({ ...pkg, status: 'failed', error: 'File not found' });
        continue;
      }
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(localPath, {
        folder: 'travel-packages',
        public_id: `package-${pkg.id}`,
        overwrite: false
      });
      
      results.push({
        ...pkg,
        cloudinary_url: result.secure_url,
        public_id: result.public_id,
        status: 'success'
      });
      
      console.log(`✅ Uploaded: ${result.secure_url}\n`);
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
      results.push({ ...pkg, status: 'failed', error: error.message });
    }
    
    // Wait 2 seconds before next upload
    if (i < packages.length - 1) {
      await delay(2000);
    }
  }
  
  // Save results
  const csv = ['id,title,old_url,cloudinary_url,public_id,status,error'];
  results.forEach(r => {
    csv.push(`${r.id},"${r.title}","${r.old_url}","${r.cloudinary_url || ''}","${r.public_id || ''}",${r.status},"${r.error || ''}"`);
  });
  
  fs.writeFileSync('upload-results.csv', csv.join('\n'));
  console.log('✅ Results saved to upload-results.csv');
  
  // Generate SQL update statements
  const updates = results
    .filter(r => r.status === 'success')
    .map(r => `UPDATE packages SET image_url = '${r.cloudinary_url}' WHERE id = ${r.id};`);
  
  fs.writeFileSync('update-statements.sql', updates.join('\n'));
  console.log('✅ SQL update statements saved to update-statements.sql');
}

uploadAllImages();