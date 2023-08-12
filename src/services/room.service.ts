import { RoomDto } from '../dtos'
import { Room } from '../entities'

const create = async ({ name, capacityAvailable }: RoomDto) => {
  const room = new Room()

  room.name = name
  room.capacityAvailable = capacityAvailable

  const result = await room.save()
  return result
}

export const roomService = {
  create
}
