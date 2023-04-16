import Axios from 'axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { UNSPLASH_ACCESS_KEY, UNSPLASH_API_URL },
} = getConfig()

const unsplashClient = Axios.create({
  baseURL: `${UNSPLASH_API_URL}`,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
  },
})

export { unsplashClient }
