import { Head } from '@inertiajs/react';

interface SeoHeadProps {
  title: string;
  description: string;
  path: string; // e.g. '/blog' or '/'
  ogImageUrl?: string;
}

const DEFAULT_OG_IMAGE = 'https://redblock.online/og-image.png';
const BASE_URL = 'https://redblock.online';

export function SeoHead({ title, description, path, ogImageUrl }: SeoHeadProps) {
  const url = `${BASE_URL}${path}`;
  const image = ogImageUrl || DEFAULT_OG_IMAGE;

  return (
    <Head title={title}>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
