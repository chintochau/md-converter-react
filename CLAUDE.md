# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fitness Tools is a React application built with Vite that provides two main features:
1. **Markdown Converter**: Converts text containing literal `\n` characters into properly formatted Markdown with actual newlines
2. **Exercise Plan Generator**: Generates personalized exercise plans using an API and displays them with detailed exercise information

## Architecture

- **Framework**: React 19 with Vite
- **Main Components**:
  - `src/App.jsx` - Main app with tab navigation
  - `src/components/ExerciseChat.jsx` - Exercise plan generator UI
  - `src/components/ExerciseList.jsx` - Exercise list display
- **Services**:
  - `src/services/api.js` - API client for exercise chat endpoint
- **Styling**: Component-specific CSS files and global styles
- **Dependencies**: 
  - marked.js - For Markdown to HTML conversion
  - React & React DOM - UI framework

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (hot reload enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

## Key Implementation Details

### Tab Navigation (App.jsx)
- `activeTab` state controls which feature is displayed
- Two tabs: "Markdown Converter" and "Exercise Plan Generator"

### Markdown Converter
- **State**: `rawContent`, `conversionMethod`, `htmlOutput`
- **Conversion Methods**: replace, regex, split
- **Functions**: `convertContent()`, `clearContent()`, `copyOutput()`, `downloadOutput()`

### Exercise Plan Generator
- **API Integration**: POST to `http://localhost:3000/api/v1.2/exercises/chat`
- **Response Handling**: Parses markdown output and displays exercise details
- **Dual View**: Toggle between markdown plan view and exercise list view
- **Exercise Cards**: Display name, difficulty, thumbnail, instructions, benefits, and cautions

### API Configuration (services/api.js)
- Base URL: `http://localhost:3000/api/v1.2`
- API Key: `wibbi-api-key` (should be environment variable in production)
- Headers: `x-api-key` and `Content-Type: application/json`

## Deployment

**Vercel Deployment**:
- No configuration needed - Vercel auto-detects Vite
- Builds with `npm run build`
- Serves from `dist/` directory

## Common Modifications

When modifying this application:
1. Update API configuration in `src/services/api.js` for different endpoints
2. Add new exercise display fields in `ExerciseList.jsx`
3. Modify styling in component-specific CSS files
4. Test both features thoroughly, especially API error handling
5. Ensure responsive design works on mobile (CSS Grid switches to single column)

## Environment Variables (TODO)

For production, move these to environment variables:
- API Base URL (currently hardcoded to localhost:3000)
- API Key (currently hardcoded as 'wibbi-api-key')