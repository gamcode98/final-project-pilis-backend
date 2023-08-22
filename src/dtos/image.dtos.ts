import { BaseDto } from '.'

export interface ImageDto extends BaseDto {
  url: string
}

export interface UpdateImageDto extends Partial<ImageDto> {}
