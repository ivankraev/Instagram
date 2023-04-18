import { useMemo } from 'react'
import Head from 'next/head'

import AppBar from './appbar/AppBar'

const createPageTitle = (suffix: string, title?: string) => {
  if (title) {
    return `${title} | ${suffix}`
  }
  return suffix
}

export const defaultOgImage = {
  src: `icon-384x384.png`,
  width: '384',
  height: '384',
}

type LayoutProps = {
  title: string
  ogImage?: string
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  prevPage?: string
  nextPage?: string
  children: React.ReactNode
}

export default function SEOLayout({
  title,
  ogImage,
  canonicalUrl,
  prevPage,
  nextPage,
  metaTitle,
  metaDescription,
  children,
}: LayoutProps) {
  const pageTitle = useMemo(() => createPageTitle('PMI', metaTitle ?? title), [metaTitle, title])
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription ?? pageTitle} />
        <meta name="og:description" content={metaDescription ?? pageTitle} />
        {canonicalUrl && (
          <>
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:url" content={canonicalUrl} />
          </>
        )}
        {prevPage && <link rel="prev" href={prevPage} />}
        {nextPage && <link rel="next" href={nextPage} />}
        <meta property="og:type" content="article" />
        <meta key="og:title" property="og:title" content={pageTitle} />
        <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage.src} />
        {!ogImage && (
          <meta key="og:image:width" property="og:image:width" content={defaultOgImage.width} />
        )}
        {!ogImage && (
          <meta key="og:image:height" property="og:image:height" content={defaultOgImage.height} />
        )}
      </Head>
      <AppBar />
      {children}
    </>
  )
}
