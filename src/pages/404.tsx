import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
  },
})

// TODO: create custom 404 page
export default function Custom404() {
  const { t } = useTranslation()
  return <h1>{t('common:errors.404Message')}</h1>
}
