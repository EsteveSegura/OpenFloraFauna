# Flora Documentation

Welcome to Flora's documentation, a visual workflow application for AI-powered image generation and processing.

---

## 📚 Available Guides

### [ARCHITECTURE.md](./ARCHITECTURE.md)
**System overview**

Read this first to understand:
- Project structure
- Data flow
- Main components
- Reactivity system
- Code patterns
- Best practices

**Ideal for:** Developers who want to understand how the application works.

---

### [STORE.md](./STORE.md)
**Pinia Store Guide**

Complete documentation about:
- Store structure
- How to access and modify data
- Node and edge management
- Reactivity with VueFlow
- Flow export/import
- Common troubleshooting

**Ideal for:** Anyone who needs to interact with the application's global state.

---

### [CREATING-NODES.md](./CREATING-NODES.md)
**How to create custom nodes**

Step-by-step tutorial:
- Define node types
- Create Vue components
- Register nodes
- Configure inputs/outputs
- Complete examples
- Validation checklist

**Ideal for:** Developers who want to add new node types to the application.

---

## 🚀 Quick Start

### Install and Run

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
```

### Configure API Keys

Configure your API keys through the Settings UI:

1. Open the application
2. Click the Settings button (⚙️)
3. Enter your API keys:
   - **Replicate API Key**: Get it from https://replicate.com/account/api-tokens
   - **OpenAI API Key**: Get it from https://platform.openai.com/api-keys
4. Keys are automatically saved to localStorage

---

## 📖 Basic Concepts

### What is a Node?

A **node** is a visual component on the canvas that performs a specific operation:
- **ImageNode** - Loads images
- **PromptNode** - Provides text/prompts
- **ImageGeneratorNode** - Generates images with AI
- **DiffNode** - Compares two images

### What is an Edge?

An **edge** is a connection between two nodes that allows data flow from one to another.

### What is a Flow?

A **flow** is the complete set of nodes and connections on the canvas. It can be exported as JSON and imported later.

---

## 🎯 Common Use Cases

### Generate an image from prompt

1. Drag a **PromptNode** to the canvas
2. Drag an **ImageGeneratorNode** to the canvas
3. Write your prompt in the PromptNode
4. Connect the PromptNode to the ImageGeneratorNode
5. Click "Generate Image"

### Modify an existing image

1. Drag an **ImageNode** to the canvas
2. Upload your image
3. Drag a **PromptNode** with the desired change
4. Drag an **ImageGeneratorNode**
5. Connect both to the ImageGeneratorNode
6. Generate the modified image

### Compare two images

1. Create two images (ImageNode or ImageGeneratorNode)
2. Drag a **DiffNode** to the canvas
3. Connect both images to the DiffNode
4. The diff is generated automatically

---

## 🛠️ Technology Stack

- **Vue 3** - Frontend framework (Composition API)
- **VueFlow 1.48.0** - Visual node system
- **Pinia** - State management
- **Vite** - Build tool
- **Replicate API** - AI image generation

---

## 📂 Key File Structure

```
src/
├── components/
│   ├── base/
│   │   └── BaseNode.vue          # Base component for all nodes
│   ├── canvas/                    # Canvas UI components
│   │   ├── FloatingMenu.vue      # Left sidebar menu
│   │   ├── NodesSidebar.vue      # Draggable nodes list
│   │   └── SettingsModal.vue     # Settings modal
│   └── nodes/                     # All custom nodes
│
├── composables/                   # Reusable logic
│   ├── useFlowIO.js              # Import/export operations
│   ├── useViewportControls.js    # Lock/unlock and fit view
│   ├── useCopyPaste.js           # Copy/paste nodes
│   ├── useNodeCreation.js        # Node creation helpers
│   ├── useDragAndDrop.js         # Drag & drop logic
│   ├── useGroupManagement.js     # Group/ungroup operations
│   └── useKeyboardShortcuts.js   # Global shortcuts
│
├── views/
│   └── FlowCanvasView.vue        # Main canvas (~177 lines)
│
├── stores/
│   ├── flow.js                   # Pinia store (nodes/edges)
│   └── settings.js               # Settings store (config)
│
├── lib/
│   ├── node-shapes.js            # Node types and schemas
│   ├── node-registry.js          # Component registry
│   ├── connection.js             # Connection validation
│   └── flow-io.js                # Export/import
│
└── services/
    └── replicate.js              # API integration
```

---

## 🎓 Learning Resources

### External Documentation

- [Vue 3 Docs](https://vuejs.org/) - Main framework
- [VueFlow Docs](https://vueflow.dev/) - Node system
- [Pinia Docs](https://pinia.vuejs.org/) - State management
- [Replicate Docs](https://replicate.com/docs) - AI API

### Code Examples

Each existing node is a good reference example:
- `ImageNode.vue` - Simple node without inputs
- `PromptNode.vue` - Node with text input
- `ImageGeneratorNode.vue` - Complex node with toolbar and async
- `DiffNode.vue` - Node with canvas processing

---

## 🐛 Troubleshooting

### Edges don't appear

**Solution:** Read the "Edge Management" section in [STORE-en.md](./STORE-en.md)

### Nodes lose state

**Solution:** Read "Maintaining Array References" in [ARCHITECTURE-en.md](./ARCHITECTURE-en.md)

### Changes not detected reactively

**Solution:** Read "Reactivity and Synchronization" in [ARCHITECTURE-en.md](./ARCHITECTURE-en.md)

### More problems

Check the "Troubleshooting" section in [ARCHITECTURE-en.md](./ARCHITECTURE-en.md)

---

## 🤝 Contributing

### Add a New Node

Follow the complete guide in [CREATING-NODES-en.md](./CREATING-NODES-en.md)

### Add a New AI Model

1. Edit `src/services/replicate.js`
2. Add configuration in `modelConfigs`
3. Define parameters and UI schema
4. Test with ImageGeneratorNode

### Improve Documentation

Guides are in `docs/` and are Markdown files. Pull requests welcome!

---

## 📋 Recent Improvements

### v3.0 - Modularization (2025-12)

The project has been heavily modularized with composables pattern:

**Achievements:**
- ✅ FlowCanvasView reduced from ~850 to ~177 lines (-79.2%)
- ✅ Extracted 3 UI components (FloatingMenu, NodesSidebar, SettingsModal)
- ✅ Created 7 composables for logic separation
- ✅ Added settings store for app configuration
- ✅ Implemented keyboard shortcuts (Ctrl+C/V/G)
- ✅ Added group management functionality
- ✅ Copy/paste nodes feature
- ✅ Viewport controls (lock/unlock, fit view)

### v2.0 - VueFlow Composables Migration (2025-11)

Migrated to use VueFlow's native composables:

- ✅ Simplified store (removed 6 actions, 2 getters)
- ✅ Better reactivity
- ✅ More maintainable code
- ✅ Consistent pattern across all nodes

---

## 📊 Project Metrics

### FlowCanvasView.vue Evolution

| Metric | v1.0 | v2.0 | v3.0 (Current) |
|--------|------|------|----------------|
| Total lines | ~850 | ~850 | ~177 |
| UI Components | 0 | 0 | 3 |
| Composables | 0 | 0 | 7 |
| Reduction | - | - | **-79.2%** |

### Store Simplification

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Store actions | 9 | 4 | **-56%** |
| Store getters | 2 | 0 | **-100%** |
| Manual lookups | ~80 | 0 | **-100%** |
| Stores count | 1 | 2 | Settings added |

---

## 🔄 Development Cycle

1. **Create new node** → [CREATING-NODES-en.md](./CREATING-NODES-en.md)
2. **Interact with store** → [STORE-en.md](./STORE-en.md)
3. **Understand architecture** → [ARCHITECTURE-en.md](./ARCHITECTURE-en.md)
4. **Test locally** → `npm run dev`
5. **Build for production** → `npm run build`

---

## 📧 Support

For questions or issues:
1. Review these guides first
2. Search in "Troubleshooting" section
3. Review existing code examples
4. Consult official library documentation

---

## 📝 Documentation Changelog

### 2025-12-17 - Modularization Documentation

- ✅ Updated architecture with composables section
- ✅ Added settings store documentation
- ✅ Updated project structure and metrics
- ✅ Documented new features (keyboard shortcuts, groups, copy/paste)
- ✅ Added modularization plan reference

### 2025-12-11 - Complete Documentation

- ✅ Complete architecture guide
- ✅ Pinia store guide
- ✅ Node creation tutorial
- ✅ README with index and quick start
- ✅ English translations

---

**Last updated:** December 17th, 2025

**Flora Version:** 3.0 (Modularization with composables pattern)
