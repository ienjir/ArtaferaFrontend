import {Picture} from "@core/interfaces/picture";

export interface ArtPicture {
  id: number
  createdAt: string
  updatedAt: string
  artId: number
  pictureId: number
  picture?: Picture
  name: string
  priority?: number
}
