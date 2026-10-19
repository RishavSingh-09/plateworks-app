// Tells you (and anyone doing the hands-on labs) whether the page is reading from the CMS.
export default function SourceNote({ source }) {
  const live = source === 'cms';
  return (
    <p className={`source ${live ? 'source-live' : 'source-sample'}`}>
      {live
        ? 'Content is coming live from the Strapi CMS.'
        : 'Showing built-in sample content because the CMS did not respond.'}
    </p>
  );
}
