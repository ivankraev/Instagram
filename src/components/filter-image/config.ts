export const IMAGE_WIDTH = 600

type ImageFilterWithType = Record<FilterType, FilterObject>

export const normalizedFilters: ImageFilterWithType = {
  none: { value: 'none', label: 'Default' },
  grayscale: { value: 'grayscale', label: 'Grayscale' },
  sepia: { value: 'sepia', label: 'Sepia' },
}
