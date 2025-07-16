# 📸 Image Guidelines for Gambia Flyaway Apartments

## 🏠 Apartment Images

### **Recommended Sizes:**
- **Desktop**: 800x600px (4:3 aspect ratio)
- **Tablet**: 600x450px (4:3 aspect ratio)  
- **Mobile**: 400x300px (4:3 aspect ratio)

### **Naming Convention:**
```
apartment-[id]-[size].webp
apartment-[id]-[size].jpg (fallback)

Examples:
- apartment-1-800x600.webp
- apartment-1-600x450.webp
- apartment-1-400x300.webp
```

### **File Structure:**
```
public/images/apartments/
├── apartment-1-800x600.webp
├── apartment-1-800x600.jpg
├── apartment-1-600x450.webp
├── apartment-1-600x450.jpg
├── apartment-1-400x300.webp
├── apartment-1-400x300.jpg
└── ... (repeat for each apartment)
```

## 🎨 Other Images

### **Hero Section:**
- **Size**: 1920x1080px (16:9)
- **Location**: `public/images/hero/`
- **Format**: WebP + JPEG fallback
- **Max Size**: 500KB

### **Icons:**
- **Size**: 24x24px, 32x32px, 48x48px
- **Location**: `public/images/icons/`
- **Format**: SVG (preferred) or PNG
- **Max Size**: 10KB

### **Logos:**
- **Format**: SVG (scalable)
- **Location**: `public/images/logos/`
- **Max Size**: 20KB

## 🛠️ Optimization Tips

1. **Use WebP format** with JPEG fallback
2. **Compress images** to 85-90% quality
3. **Use responsive images** with multiple sizes
4. **Lazy load** non-critical images
5. **Optimize file names** (no spaces, use hyphens)

## 📱 Performance Targets

- **Apartment images**: 50-150KB each
- **Hero images**: 200-500KB each
- **Icons**: 5-10KB each
- **Total image budget**: Under 2MB per page

## 🔧 Tools for Optimization

- **Online**: TinyPNG, Squoosh.app
- **Command line**: ImageOptim, cwebp
- **Figma**: Export as WebP
- **Photoshop**: Save for Web

## 📋 Checklist Before Adding Images

- [ ] Images are 800x600px (apartments) or 1920x1080px (hero)
- [ ] Files are under recommended size limits
- [ ] WebP format with JPEG fallback
- [ ] Descriptive but concise alt text
- [ ] Proper file naming convention
- [ ] Images are optimized for web
