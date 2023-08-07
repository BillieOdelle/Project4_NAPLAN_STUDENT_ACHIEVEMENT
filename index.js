async function getData() {
  const url = "./Naplan_results_clean.json";
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const tableHeaders = Object.keys(data[0]);
  console.log("tableHeaders", tableHeaders);

  const tableBody = document.getElementById("data-table");

  let tableHTML = "<tr>";

  tableHeaders.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr>";

  data.slice(0, 100).forEach((row) => {
    tableHTML += "<tr>";
    tableHeaders.forEach((field) => {
      tableHTML += `<td>${row[field]}</td>`;
    });
    tableHTML += "</tr>";
  });

  tableBody.innerHTML = tableHTML;
}

getData();
