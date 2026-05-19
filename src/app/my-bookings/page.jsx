import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  console.log(user);

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`);

  const bookings = await res.json();
  console.log(bookings);

  return (
    <div className="mx-5">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div>
        {bookings.length === 0 ? (
          <p>You have no bookings.</p>
        ) : (
      
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-4 my-2 flex  justify-between items-center">
                <div>

                <Image alt={booking.facilityName}
                src={booking.imageUrl}
                width={300}
                height={200}
                />

                <h2 className="text-xl font-semibold">{booking.facilityName}</h2>

                <p>Total Price: ${booking.totalPrice}</p>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Duration: {booking.hours} hours</p>
                <p>Status: {booking.status}</p>
                <p>Time Slot: {booking.timeSlot}</p>

                </div>
                <Button >
                  Cancel Booking
                </Button>

              </li>
              
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
