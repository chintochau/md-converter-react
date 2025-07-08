# Markdown Content Converter

A React-based web application that converts text containing literal `\n` characters into properly formatted Markdown with actual newlines, then renders it as HTML.

## Features

- Three conversion methods:
  - **Replace \n**: Simple string replacement
  - **Smart Clean**: Regex-based with excessive newline removal
  - **Split & Join**: Split on `\n` and rejoin with actual newlines
- Live preview with markdown rendering
- Copy HTML to clipboard
- Download as HTML file
- Pre-populated with example content

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This app is configured for easy deployment to Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy.

## Technologies

- React + Vite
- marked.js for Markdown parsing
- Modern CSS with responsive design
