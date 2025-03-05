import axios from "axios"; // Import Axios
import { Input } from "@/components/ui/input";
import { useState, useEffect, useContext, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";

export default function PayPalButton({ subcriber, open, setOpen }) {
  const [amount, setAmount] = useState();
  const [paypalEmail, setPaypalEmail] = useState();
  const [checkout, setCheckout] = useState(false);
  const [errors, setErrors] = useState({ amount: "", paypalEmail: "" });

  // Validate the amount
  const validateAmount = (value) => {
    if (!value) return "Amount is required";
    if (isNaN(value) || parseFloat(value) <= 0)
      return "Amount must be a positive number";
    return "";
  };

  // Validate the PayPal email
  const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return "PayPal email is required";
    if (!regex.test(value)) return "Invalid email format";
    return "";
  };

  // Handle amount change
  const handleChangeAmount = (e) => {
    const value = e.target.value;
    setAmount(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      amount: validateAmount(value),
    }));
  };

  // Handle email change
  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setPaypalEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      paypalEmail: validateEmail(value),
    }));
  };
  const isFormValid =
    !errors.amount && !errors.paypalEmail && amount && paypalEmail;
  useEffect(() => {
    // Load PayPal SDK script
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_CLIENT_ID}&currency=USD&components=buttons&enable-funding=card&disable-funding=credit,venmo`;
    script.async = true;
    script.onload = () => {
      if (window.paypal && checkout == true) {
        window.paypal
          .Buttons({
            style: {
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "paypal",
            },
            disableFunding: ["credit"],
            createOrder: async function () {
              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payment-gateway/paypal/create-order`,
                  {
                    amount: Number(amount),
                    currency: "USD",
                    advertisement_id: subcriber.campaign_id,
                    receiver_user_id: subcriber.subscriber_id,
                    paypal_receiver_email: paypalEmail,
                  },
                  {
                    withCredentials: true,
                  }
                );

                const orderData = response.data;
                if (orderData.id) {
                  return orderData.id;
                }

                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              } catch (error) {
                console.error(error);
                throw error;
              }
            },
            onApprove: async (data, actions) => {
              try {
                const response = await axios.post(
                  `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payment-gateway/paypal/capture-payment/${data.orderID}`,
                  {},
                  {
                    withCredentials: true,
                  }
                );

                const orderData = response.data;
                if (!orderData) {
                  throw new Error("No data received from the server");
                }

                if (orderData.error) {
                  throw new Error(orderData.error.message || "Payment failed");
                }

                const purchaseUnit =
                  orderData.response?.jsonResponse?.purchase_units?.[0];
                if (!purchaseUnit) {
                  throw new Error("Invalid purchase unit data");
                }

                const transaction =
                  purchaseUnit.payments?.captures?.[0] ||
                  purchaseUnit.payments?.authorizations?.[0];

                if (!transaction) {
                  throw new Error("Transaction details not found");
                }

                await axios
                  .post(
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/payment-gateway/paypal/create-payout`,
                    {
                      amount: Number(amount),
                      currency: "USD",
                      recipientEmail: paypalEmail,
                      orderId: data.orderID,
                    },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((response) => {
                    toast.success("Payment Success");

                    setOpen(false);
                    window.location.reload(); // Reload the page
                  });
              } catch (error) {
                console.error("Payment Error:", error);
              }
            },
          })
          .render("#paypal-button-container");
      }
    };

    document.body.appendChild(script);

    return () => {};
  }, [amount, paypalEmail, checkout, toast, setOpen]);
  return (
    <>
      <Dialog className="w-full " open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[550px]">
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
            </DialogHeader>
            <div>
              <Toaster />
            </div>

            {checkout == false && (
              <div>
                <Input
                  type="text"
                  placeholder="Amount"
                  value={amount}
                  onChange={handleChangeAmount}
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && (
                  <span className="text-red-500 text-sm">{errors.amount}</span>
                )}

                <Input
                  type="text"
                  placeholder="Paypal Email"
                  value={paypalEmail}
                  onChange={handleChangeEmail}
                  className={
                    errors.paypalEmail ? "border-red-500 mt-2" : "mt-2"
                  }
                />
                {errors.paypalEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.paypalEmail}
                  </span>
                )}

                <Button
                  disabled={!isFormValid}
                  className="mt-2 w-full"
                  onClick={() => setCheckout(true)}
                >
                  <p>Checkout</p>
                </Button>
              </div>
            )}

            <div id="paypal-button-container"></div>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}
