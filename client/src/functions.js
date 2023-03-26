import React from "react";
import { useLocation } from "react-router-dom";

/*
 ** Format deposited users info to amount:click_id and return txt file
 */
export const downloadTxtFile = (activeUsersWithClickId) => {
  let csvContent = "";

  !!(activeUsersWithClickId && activeUsersWithClickId.length) &&
    activeUsersWithClickId.forEach((item) => {
      if (item.click_id) {
        csvContent += `${item.click_id}:${item.amount}\n`;
      } else {
        csvContent += `${item.amount}\n`;
      }
    });

  const a = document.createElement("a");
  const file = new Blob([csvContent], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = "table_data.txt";
  a.click();
};

/*
 ** The Hook for get query params
 */
export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

/*
 ** Format a date to readable view
 */
export const formatDate = (date) => {
  let newDate = new Date(date * 1000);
  let readableDate = newDate.toISOString().slice(0,10).replace(/-/g, '.');

  return readableDate;
};
