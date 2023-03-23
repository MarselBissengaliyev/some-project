import React from "react";
import { useLocation } from "react-router-dom";

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

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
