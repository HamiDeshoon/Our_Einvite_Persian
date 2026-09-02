/**
 * Resolves asset paths correctly across local dev and GitHub Pages production builds.
 * Ensures the repository subpath (e.g. /Our_Einvite_Persian/) is prepended to public assets.
 */
export function asset(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const encoded = clean
    .split('/')
    .map((segment) => {
      if (segment === '') return segment;
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join('/');
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? `${base}${encoded}` : `${base}/${encoded}`;
}
