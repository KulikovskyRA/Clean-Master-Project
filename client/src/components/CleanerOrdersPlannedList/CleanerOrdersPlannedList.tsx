import * as React from "react";
import CleanerOrderPlannedCard from "../CleanerOrderPlannedCard/CleanerOrderPlannedCard";

const CleanerOrdersPlannedList = () => {
  const [plannedOrders, setPlannedOrders] = React.useState([]);

  const fetchPlannedOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3500/api/order/planned`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      setPlannedOrders(result);
      console.log("planned orders-------->", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    void fetchPlannedOrders();
  }, []);

  return (
    <>
      {" "}
      {plannedOrders.map((card) => (
        <CleanerOrderPlannedCard orderData={card} />
      ))}
    </>
  );
};

export default CleanerOrdersPlannedList;
