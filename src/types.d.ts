declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string
    APP_URL: string
    UNSPLASH_API_URL: string
    UNSPLASH_ACCESS_KEY: string
    UNSPLASH_SECRET_KEY: string
  }
}

type FilterType = 'none' | 'grayscale' | 'sepia'

type FilterMessage = {
  filter: FilterType
  imageData: ImageData
}

type Photo = {
  id: string
  height: number
  url: string
  width: number
  alt?: string
  description?: string
  divHeight: number
  key: string
}

type UnsplashPhoto = {
  width: number
  height: number
  description: string
  alt_description: string
  id: string
  blur_hash: string
  urls: {
    small: string
    raw: string
  }
}

type FilterObject = {
  value: FilterType
  label: string
}

type SelectItem = {
  value: string
  label: string
}

type Message = {
  body: string
}
