"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HSRecord } from "../page";

interface Iprops {
  ticket: any;
}
const TicketForm = (props: Iprops) => {
  const EDITMODE = props.ticket.foundTicket._id === "new" ? false : true;
  console.log(EDITMODE);
  console.log("prop ticket", props.ticket);

  const router = useRouter();

  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not Started",
    category: "Hardware Problem",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: { "content-type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }

    router.refresh();
    router.push("/");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (EDITMODE) {
    startingTicketData["title"] = props.ticket.foundTicket.title;
    startingTicketData["description"] = props.ticket.foundTicket.description;
    startingTicketData["priority"] = props.ticket.foundTicket.priority;
    startingTicketData["progress"] = props.ticket.foundTicket.progress;
    startingTicketData["status"] = props.ticket.foundTicket.status;
    startingTicketData["category"] = props.ticket.foundTicket.category;
  }

  console.log("starting", startingTicketData);

  const [formData, setFormData] = useState(startingTicketData);

  console.log("here");
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update Ticket" : "Create your Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleInputChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          aria-multiline="true"
          onChange={handleTextAreaChange}
          required={true}
          value={formData.description}
        />
        <label>Category</label>
        <select
          name="category"
          onChange={handleSelectChange}
          value={formData.category}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project Problem">Project Problem</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleInputChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleInputChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleInputChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>1</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleInputChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleInputChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleInputChange}
        />
        <label>Status</label>
        <select
          name="status"
          onChange={handleSelectChange}
          value={formData.status}
        >
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="complete">Complete</option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs ml-auto mr-auto"
          value={EDITMODE ? "Save" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default TicketForm;
