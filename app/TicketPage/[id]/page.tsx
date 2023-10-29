import TicketForm from "@/app/(components)/TicketForm";
import { HSRecord } from "@/app/page";
import React from "react";

const getTicketById = async (id: string) => {
  console.log("id: ", id);
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to get ticket");
  }
  return res.json();
};

const TicketPage = async ({ params }: { params: { id: string } }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData: HSRecord = {
    active: false,
    _id: "",
    createdAt: "",
    title: "",
    description: "",
    category: "",
    priority: 0,
    status: "",
    progress: 0,
  };
  if (EDITMODE) {
    console.log("editing");
    updateTicketData = await getTicketById(params.id);
    console.log(updateTicketData);
  } else {
    updateTicketData = {
      _id: "new",
      createdAt: "",
      title: "",
      description: "",
      category: "",
      priority: 0,
      status: "",
      progress: 0,
      active: false,
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
