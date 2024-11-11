import React from "react";
import { PurchasesTable } from "./PurchasesTable";

const Purchases = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">My Purchases</h1>
      <PurchasesTable />
    </div>
  );
};

export default Purchases;
