# 🚀 Meesho Auto Lister

Browser extension for **automated bulk product listing on Meesho** platform.

## Features ✨

- 📁 **CSV Bulk Upload** - Import multiple products at once
- ⚡ **Auto-fill Forms** - Automatically fill product details
- 🔄 **Retry Logic** - Automatic retries for failed listings
- ⏱️ **Customizable Delays** - Adjust timing between actions
- 📊 **Progress Tracking** - Real-time progress monitoring
- 📋 **Data Preview** - Preview your data before listing
- 💾 **Settings Management** - Configure extension behavior

## Installation 📦

### Method 1: Manual Installation (Developer Mode)

1. **Clone or Download** this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **"Developer mode"** (top right corner)
4. Click **"Load unpacked"**
5. Select the folder containing these files
6. ✅ Extension installed!

## How to Use 🎯

### Step 1: Prepare Your CSV File

Create a CSV file with these columns:
```csv
name,price,description,stock,category
Premium T-Shirt,299,High quality cotton t-shirt,50,Clothing
```

**Required columns:**
- `name` - Product name
- `price` - Product price
- `description` - Product description
- `stock` - Available stock quantity
- `category` - Product category (optional)

### Step 2: Open Meesho Seller Dashboard

1. Go to [Meesho Supplier Dashboard](https://supplier.meesho.com)
2. Login to your seller account
3. Navigate to the product listing page

### Step 3: Use the Extension

1. **Click the extension icon** in Chrome toolbar
2. **"Upload CSV"** tab is already selected
3. **Drag & drop** your CSV file or **click** to select
4. **Preview Data** to verify before listing
5. **Start Listing** to begin automation

### Step 4: Monitor Progress

- Real-time progress bar shows completion percentage
- Logs display each product's status
- ✅ Success, ❌ Errors, ⏳ Retries all logged

## Configuration ⚙️

### Settings Tab

Customize these parameters:

| Setting | Default | Range | Description |
|---------|---------|-------|-------------|
| Auto-fill delay | 1000ms | 500-5000ms | Delay between form fills |
| Max retries | 3 | 1-5 | Retry attempts per product |

## File Structure 📁

```
meesho-auto-lister/
├── manifest.json          # Extension configuration
├── popup.html            # Extension UI
├── popup.js              # UI logic
├── style.css             # Styling
├── content.js            # Page interaction
├── background.js         # Background service worker
├── sample-products.csv   # Template CSV file
└── README.md            # Documentation
```

## Troubleshooting 🔧

### Extension not loading?
- Check `manifest.json` syntax
- Ensure all files are in the same folder
- Refresh the extension in Chrome

### Forms not filling?
- Meesho's HTML structure might have changed
- Update selectors in `content.js`
- Check browser console for errors (F12)

### CSV not parsing?
- Ensure file is comma-separated (.csv)
- No special characters in headers
- Check for extra spaces or line breaks

## Important Notes ⚠️

- **Always test** with a small batch first
- **Check Meesho's Terms of Service** before automation
- Some actions may violate platform policies
- Use responsibly and ethically

## Compatibility ✅

- **Browser:** Chrome 90+
- **OS:** Windows, Mac, Linux

## Disclaimer ⚡

This extension is provided "as-is" without any warranty. Use at your own risk.

**Always comply with Meesho's Terms of Service and policies.**

---

**Made with ❤️ by mkumarfzd17-cmd**

⭐ If helpful, please star this repository!
