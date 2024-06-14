self.addEventListener("message", (event) => {
  const { row, tableHeaders, tableHeaderNames } = event.data;
  const cells = [];

  Object.keys(row).forEach((cell) => {
    if (tableHeaderNames.includes(cell)) {
      const tableHeader = tableHeaders.find(
        (tableHeader) => tableHeader.name === cell
      );

      if (tableHeader)
        cells.push({
          value: row[cell],
          header: tableHeader,
        });
    }
  });

  self.postMessage(cells);
});
