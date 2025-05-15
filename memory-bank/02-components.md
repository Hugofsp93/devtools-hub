# Components Documentation

## Core Components

### Layout Component
- **File**: `src/components/Layout.tsx`
- **Purpose**: Main layout wrapper for the entire application
- **Features**:
  - Responsive layout structure
  - Dark/Light theme support
  - Navigation header
  - Consistent spacing and container

### Theme Components
- **DarkThemeToggle**
  - Toggle between dark and light themes
  - Uses Flowbite's theming system
- **SunSvgIcon/MoonSvgIcon**
  - Theme toggle icons
  - Animated transitions

## Tool Components

### 1. CSS Gradient Studio
- **Purpose**: Create and customize CSS gradients
- **Features**:
  - Live preview
  - Color picker
  - Gradient angle control
  - CSS code export

### 2. Color Palette Creator
- **Purpose**: Generate color schemes
- **Features**:
  - Complementary colors
  - Analogous colors
  - Triadic colors
  - Color harmony suggestions

### 3. Box Shadow Generator
- **Purpose**: Create custom box shadows
- **Features**:
  - Multiple shadow layers
  - Live preview
  - CSS code export
  - Preset shadows

### 4. Geometric Pattern Maker
- **Purpose**: Create geometric patterns
- **Features**:
  - Shape customization
  - Color controls
  - Pattern arrangement
  - Export options

### 5. TaskFlow
- **Purpose**: Task management application
- **Features**:
  - Drag and drop interface
  - Task categories
  - Progress tracking
  - Local storage

### 6. QR Code Studio
- **Purpose**: QR code generation
- **Features**:
  - Custom styling
  - Error correction
  - Download options
  - Preview

### 7. AI Image Creator
- **Purpose**: AI-powered image generation
- **Features**:
  - Text to image
  - Style customization
  - Export options
  - API integration

### 8. Email Sandbox
- **Purpose**: Email template testing
- **Features**:
  - Real-time preview
  - Spam score checking
  - Template validation
  - Client compatibility

### 9. Glassmorphism Designer
- **Purpose**: Create glass-like UI elements
- **Features**:
  - Blur effects
  - Transparency controls
  - Border customization
  - Live preview

### 10. Color Picker Pro
- **Purpose**: Advanced color selection
- **Features**:
  - Multiple color formats
  - Color harmony
  - Advanced manipulation
  - History tracking

### 11. Chart Builder
- **Purpose**: Data visualization
- **Features**:
  - Multiple chart types
  - Data input
  - Customization options
  - Export capabilities

### 12. JSON Visualizer
- **Purpose**: JSON data visualization
- **Features**:
  - Tree view
  - Syntax highlighting
  - Validation
  - Formatting

## Component Relationships
- All tool components are wrapped by the Layout component
- Components share common UI elements from Flowbite
- Theme toggle affects all components through context
- Each tool component is self-contained and independently routable

## Component State Management
- Local state for tool-specific data
- URL parameters for sharing tool states
- Theme state managed at application level
- Local storage for persistent data (where applicable)
