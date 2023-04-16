export const unsplashToCustom = (photos: UnsplashPhoto[]) => {
  return photos.map((photo: UnsplashPhoto, idx) => {
    const WIDTH = 390

    const ratio = WIDTH / photo.width
    const height = photo.height * ratio

    return {
      height,
      id: photo.id,
      width: WIDTH,
      divHeight: height,
      url: photo.urls.small,
      alt: photo.alt_description,
      description: photo.description,
      key: `${photo.id}-${photo.urls.raw}-${idx}`,
    }
  })
}
