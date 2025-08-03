import { getHotels } from "@/database";
import HotelCard from "./HotelCard";

const HotelList = async () => {
  await getHotels();

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        <HotelCard />
      </div>
    </div>
  );
};

export default HotelList;
