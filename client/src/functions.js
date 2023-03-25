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
  const newDate = new Date(date * 1000);
  let day = newDate.getUTCDate();
  if (day.toString().length === 1) {
    day = `0${day}`;
  }

  let month = newDate.getUTCMonth() + 1;
  if (month.toString().length === 1) {
    month = `0${month}`;
  }

  const year = newDate.getUTCFullYear();
  return `${day}.${month}.${year}`;
};
