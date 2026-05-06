# 🧩 CODEX AI - Easy Plugin Management

## How to Add New Plugins

The plugin system is designed to be **super simple** to extend. All plugins are defined in a single JavaScript array in `script.js`.

### Adding a Plugin (3 Steps)

1. **Open `script.js`**
2. **Find the `plugins` array** (around line 24-47)
3. **Add a new plugin object** to the array:

```javascript
const plugins = [
  // ... existing plugins ...
  {
    name: 'Your Plugin Name',
    description: 'Brief description of what this plugin does',
    installCmd: 'npm install @codex/your-plugin'
  },
  // ... more plugins ...
];
```

### Example: Add a Video Processing Plugin

```javascript
{
  name: 'Video Processor',
  description: 'Process and enhance videos with AI-powered effects',
  installCmd: 'npm install @codex/video-processor'
}
```

### Example: Add a Database Integration Plugin

```javascript
{
  name: 'Database Connector',
  description: 'Connect to SQL, NoSQL, and cloud databases seamlessly',
  installCmd: 'npm install @codex/db-connector'
}
```

## Current Plugins

The default installation includes:

1. **Data Processor** - Process and clean your data automatically
2. **Image Analyzer** - Analyze images using advanced AI algorithms
3. **Text Generator** - Generate high-quality text content
4. **API Connector** - Connect to various APIs effortlessly
5. **ML Pipeline** - Build and manage machine learning pipelines
6. **Data Visualizer** - Create beautiful data visualizations

## Plugin Display

Plugins are automatically displayed in the Plugins modal as cards with:
- Plugin name
- Description
- Copy Install Command button (with copy-to-clipboard functionality)

No additional code needed! Just add to the array and it appears on the website.

## Features

✅ **Instant Updates** - Add plugins and they appear immediately  
✅ **Copy to Clipboard** - One-click install command copying  
✅ **Professional UI** - Beautiful card-based layout  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Easy to Customize** - Edit plugin names, descriptions, and install commands

---

**That's it!** No HTML changes needed. Just update the array in `script.js` and you're done.
