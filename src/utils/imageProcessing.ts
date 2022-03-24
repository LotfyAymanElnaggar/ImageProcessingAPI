import sharp from 'sharp'

// query segments
interface sharpResizeParams {
  imgSource: string
  targetLocation: string
  width: number
  height: number
}

const processImage = async (
  params: sharpResizeParams
): Promise<null | string> => {
  try {
    await sharp(params.imgSource)
      .resize(params.width, params.height)
      .toFile(params.targetLocation)
    return null
  } catch {
    return 'Image could not be processed.'
  }
}

export default processImage
