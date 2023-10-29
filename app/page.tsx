import TicketCard from "./(components)/TicketCard";

import React from "react";
import HSRecord from "./(models)/HSRecord";

export interface HSRecord {
  _id: string;
  createdAt: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  progress: number;
  status: string;
  active: boolean;
}

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }: { category: String }) => category)),
  ] as String[];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, categoryIndex) => (
            <div className="mb-4" key="categoryIndex">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid grid-cols-4">
                {tickets
                  .filter(
                    (ticket: HSRecord) => ticket.category === uniqueCategory
                  )
                  .map(
                    (
                      filteredTicket: HSRecord,
                      _index: React.Key | null | undefined
                    ) => (
                      <TicketCard
                        id={_index}
                        key={_index}
                        ticket={filteredTicket}
                      />
                    )
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
