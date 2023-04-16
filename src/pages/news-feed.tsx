import { GetServerSideProps } from 'next'

/* import logger from 'service/logger' */
import { PER_PAGE } from 'components/news-feed/config'
import { getPhotos } from 'utils/get-photos'
import NewsFeedPage from 'components/news-feed'

export const getServerSideProps: GetServerSideProps = async () => {
  const initialPhotos = (await getPhotos({ page: 1, limit: PER_PAGE })) || []
  /*   logger.info('Test info logs')
  logger.error('Test error logs') */

  return {
    props: {
      initialPhotos,
    },
  }
}

export default NewsFeedPage
