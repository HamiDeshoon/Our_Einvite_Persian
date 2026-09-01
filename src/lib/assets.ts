// Prefix a public asset path with the configured base URL so assets resolve
// correctly whether the app is served from the root (localhost dev) or a
// sub-path (e.g. a GitHub Pages project site like /Our_Einvite/).
//
// Vite's `base: './'` rewrites bundled JS/CSS imports for us, but string paths
// passed straight to <img src>, <video src/poster>, three.js TextureLoader, etc.
// are NOT processed — so they must be prefixed manually.
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // './' with base: './'
  return `${base}${path.replace(/^\//, '')}`;
}
