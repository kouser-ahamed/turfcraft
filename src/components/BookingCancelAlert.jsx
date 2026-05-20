"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";

export function BookingCancelAlert({ booking}) {
  const { _id, facilityName} = booking;

  const bookingId = _id;
  const handleCancelBooking = async () => {

    // fetch(`http://localhost:5000/facility/${_id}

    // token data contains the token and other info, we need tokenData.token for authorization header
      // const {data:tokenData} = await authClient.token();
      // authorization: `Bearer ${tokenData?.token}`

      const {data:tokenData} = await authClient.token();

    const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         authorization: `Bearer ${tokenData?.token}`
      },
    });
    const data = await res.json();
    window.location.reload();


  }
  return (
    <AlertDialog>
      <Button className="w-full md:w-auto h-11 px-5 rounded-xl border border-slate-200 bg-white text-xs font-bold  tracking-wider text-rose-600 shadow-xs transition-all duration-200 hover:bg-rose-50 hover:border-rose-200 active:scale-[0.98]">
        Cancel Booking
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Cancel booking permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel <strong>{booking.facilityName}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
