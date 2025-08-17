"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentForm = ({ loggedInUser, hotelInfo, checkin, checkout }) => {
  const [error, setError] = useState();
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userId = loggedInUser?.id;
    const hotelId = hotelInfo?.id;
    const checkin = formData.get("checkin");
    const checkout = formData.get("checkout");

    try {
      const res = await fetch("/api/auth/payment", {
        method: "POST",
        body: JSON.stringify({
          hotelId,
          userId,
          checkin,
          checkout,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      res.status === 201 && router.push("/bookings");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={onSubmit} className="my-8">
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={loggedInUser.name}
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={loggedInUser?.email}
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input value={checkin} type="date" name="checkin" id="checkin" />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input value={checkout} type="date" name="checkout" id="checkout" />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Pay Now (${(hotelInfo?.highRate + hotelInfo?.lowRate) / 2})
      </button>
    </form>
  );
};

export default PaymentForm;
