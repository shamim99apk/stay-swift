import { hotelModel } from "@/models/hotel-model";
import { replaceMongoIdInArray } from "@/utils/data-utils";

export async function getHotels() {
  const hotels = await hotelModel.find().lean();
  return replaceMongoIdInArray(hotels);
}
