# Architecture
- Keep sales content in the index route and use the shared Button and Accordion components for checkout links and FAQs, so the sales page preserves the existing design system.
- Keep offer values and repeated sales content in a browser-safe module with concrete offer tests, so reference updates stay consistent across the page.
- Use a dedicated React HTML5 video player and CDN asset pointers for downloaded reference media, so playback is accessible and binaries stay out of the repository.
- Keep the interactive platform showcase in a dedicated component sourced from the shared benefits list, so feature descriptions stay consistent and supplied demonstration images can be added without changing the sales route.