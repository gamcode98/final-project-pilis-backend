import { ImageDto, UpdateImageDto } from '../dtos'
import { Image } from '../entities'

const create = async ({ url }: ImageDto) => {
  const image = new Image()

  image.url = url

  const result = await image.save()
  return result
}

const findOne = async (id: ImageDto['id']) => {
  const result = await Image.findOneBy({ id })

  return result
}

const findAll = async () => {
  const result = await Image.find()

  return result
}

const update = async (id: number, updateImageDto: UpdateImageDto) => {
  const result = await Image.update({ id }, updateImageDto)

  return result
}

export const imageService = {
  create,
  findOne,
  findAll,
  update
}
