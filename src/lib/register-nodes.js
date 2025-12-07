/**
 * Node Registration
 * Register all available node types with the registry
 */

import nodeRegistry from './node-registry'
import { NODE_TYPES, PORT_TYPES } from './node-shapes'
import ImageNode from '@/components/nodes/ImageNode.vue'
import ImageGeneratorNode from '@/components/nodes/ImageGeneratorNode.vue'

/**
 * Register all available node types
 */
export function registerAllNodes() {
  // Register Image Node
  nodeRegistry.registerNode({
    type: NODE_TYPES.IMAGE,
    label: 'Image',
    description: 'Source image node - upload and use images as input for other nodes',
    inputs: [],
    outputs: [PORT_TYPES.IMAGE],
    component: ImageNode,
    config: {
      category: 'Input',
      color: '#4CAF50'
    }
  })

  // Register Image Generator Node
  nodeRegistry.registerNode({
    type: NODE_TYPES.IMAGE_GENERATOR,
    label: 'Image Generator',
    description: 'Generate images using AI based on a text prompt',
    inputs: [PORT_TYPES.IMAGE],
    outputs: [PORT_TYPES.IMAGE],
    component: ImageGeneratorNode,
    config: {
      category: 'Generator',
      color: '#2196F3'
    }
  })

  console.log('[NodeRegistry] All nodes registered successfully')
}

/**
 * Get registered node types for UI display
 * @returns {Array} Array of node types with their metadata
 */
export function getAvailableNodeTypes() {
  return nodeRegistry.listNodes().map(node => ({
    type: node.type,
    label: node.label,
    description: node.description,
    category: node.config.category,
    icon: getNodeIcon(node.type)
  }))
}

/**
 * Get icon for a node type
 * @param {string} type - Node type
 * @returns {string} Icon emoji
 */
function getNodeIcon(type) {
  const icons = {
    [NODE_TYPES.IMAGE]: '📷',
    [NODE_TYPES.IMAGE_GENERATOR]: '✨'
  }
  return icons[type] || '⚙️'
}

export default nodeRegistry
