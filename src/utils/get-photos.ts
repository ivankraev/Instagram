import { unsplashClient } from 'service/apiClient'
import { unsplashToCustom } from './unsplash-to-custom'
import { AxiosRequestConfig } from 'axios'

type GetPhotosArgs = {
  page: number
  limit: number
  orderBy?: string
  options?: AxiosRequestConfig
}

export const getPhotos = async ({ page, limit, orderBy = 'popular', options }: GetPhotosArgs) => {
  const url = `/photos?per_page=${limit}&page=${page}&order_by='${orderBy}'`
  try {
    const { data } = await unsplashClient.get(url, options)
    return unsplashToCustom(data)
  } catch (error) {
    console.log(error)
  }
}
