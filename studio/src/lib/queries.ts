// Move the video-related query parts here
const projectFields = `
  // ... existing fields ...
  videos[] {
    url,
    title,
    description
  },
  // ... rest of the fields ...
` 