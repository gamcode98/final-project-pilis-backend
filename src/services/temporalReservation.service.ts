import { TemporalReservationDto, UpdateTemporalReservationDto } from '../dtos'
import { TemporalReservation } from '../entities'

const create = async (data: TemporalReservationDto) => {
  const { cinemaShow, quantity } = data

  const temporalReservation = new TemporalReservation()

  temporalReservation.cinemaShow = cinemaShow
  temporalReservation.quantity = quantity

  const result = await temporalReservation.save()
  return result
}

const findOne = async (id: TemporalReservationDto['id']) => {
  const result = await TemporalReservation.findOne({ where: { id }, relations: ['cinemaShow'] })
  return result
}

const update = async (id: TemporalReservationDto['id'], updateTemporalReservationDto: UpdateTemporalReservationDto) => {
  const result = await TemporalReservation.update({ id }, updateTemporalReservationDto)
  return result
}

export const temporalReservationService = {
  create,
  findOne,
  update
}
