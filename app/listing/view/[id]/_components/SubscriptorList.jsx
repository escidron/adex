import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PayPal from "@/components/addCard/PayPal";
import { useState, useEffect, useContext } from "react";
import { DollarSignIcon, CheckCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Divider } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function SubscriptorList({ subscribers }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [subcriberData, setSubcriberData] = useState({});

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone Number", "Post Link"];
    const rows = subscribers.map((subscriber) => [
      subscriber.name,
      subscriber.email,
      subscriber.mobile_number,
      subscriber.evidence,
    ]);

    const csvContent = [
      headers.join(";"),
      ...rows.map((row) => row.join(";")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "subscribers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenEvidence = (text) => {
    window.open(text, "_blank");
  };
  const handleOpenDialogPaypal = (data,amount) => {
    console.log(data);
    setSubcriberData(data);
    setOpen(true);
  };
  const handleChange = (e) => {
    // Allow only numeric input
    const numericValue = e.target.value.replace(/[^0-9]/g, '');  // RegEx to remove non-numeric characters
    setAmount(numericValue);
    setPaymentAmount(numericValue);
    console.log(numericValue);
  };

  return (
    <div>
      <h1 className="text-[26px]">Registered ADEXer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.mobile_number}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <div>
                    <Button
                      onClick={() =>
                        router.push(
                          `/market-place/buyer-details?id=${subscriber.id}`
                        )
                      }
                      size="sm"
                      className="ml-auto"
                    >
                      Details
                    </Button>
                  </div>
                  {subscriber.evidence && (
                    <div>
                      <Button
                        onClick={() => handleOpenEvidence(subscriber.evidence)}
                        size="sm"
                        className="ml-auto"
                        variant="secondary"
                      >
                        <OpenInNewIcon
                          sx={{ marginRight: "4px", fontSize: "16px" }}
                        />
                        Post Link
                      </Button>
                    </div>
                  )}
                  {subscriber.payment_status == "UNPAID" && (
                    <div>
                      <Button
                        onClick={() => handleOpenDialogPaypal(subscriber)}
                        size="sm"
                        className="ml-auto bg-red-500"
                      >
                        <DollarSignIcon
                          sx={{ marginRight: "4px", fontSize: "16px" }}
                        />
                        Pay
                      </Button>
                    </div>
                  )}

                  {subscriber.payment_status == "PAID" && (
                    <div>
                      <Button
                        disabled={true}
                        size="sm"
                        className="ml-auto bg-green-300"
                        variant="secondary"
                      >
                        <CheckCheckIcon
                          sx={{ marginRight: "4px", fontSize: "16px" }}
                        />
                        Paid
                      </Button>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PayPal subcriber={subcriberData} open={open} setOpen={setOpen}   />

      <Divider className="my-4" />
      <div className="flex justify-center">
        <Button onClick={downloadCSV} size="sm" variant="outline">
          Download CSV
        </Button>
      </div>
    </div>
  );
}
