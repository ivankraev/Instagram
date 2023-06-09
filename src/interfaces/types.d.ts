declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string
    APP_URL: string
    UNSPLASH_ACCESS_KEY: string
    UNSPLASH_API_URL: string
    UNSPLASH_SECRET_KEY: string
  }
}

type FilterType = 'none' | 'grayscale' | 'sepia'

type FilterMessage = {
  filter: FilterType
  imageData: ImageData
}

type Photo = {
  alt?: string
  description?: string
  divHeight: number
  height: number
  id: string
  key: string
  url: string
  width: number
}

type UnsplashPhoto = {
  alt_description: string
  blur_hash: string
  description: string
  height: number
  id: string
  width: number
  urls: {
    raw: string
    small: string
  }
}

type FilterObject = {
  label: string
  value: FilterType
}

type SelectItem = {
  label: string
  value: string
}

type Message = {
  body: string
}
