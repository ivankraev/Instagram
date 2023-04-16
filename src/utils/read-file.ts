export const readFile = (file: File) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)

  return reader
}
