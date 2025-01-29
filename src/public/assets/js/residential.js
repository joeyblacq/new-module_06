const url = "http://localhost:3004/agents";
//  write a fetch that can work in postman go to post and get a list of agents

const fetchData = async () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

async function renderData(agents) {
  // Reference to the table body
  const tableBody = document.querySelector("#agentTable tbody");

  // Format fees and populate the table
  agents.data.forEach((agent) => {
    const row = document.createElement("tr");

    row.innerHTML = `
		            <td>${agent.first_name} ${agent.last_name}</td>
		            <td data-rating=${agent.rating}>${agent.rating}</td>
		            <td data-fee=${agent.fee}>${formatCurrency(agent.fee)}</td>
		        `;

    tableBody.appendChild(row);
  });

  // Function to format numbers as currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }
}

function sortTable(columnIndex) {
  const table = document.getElementById("agentTable");
  const rows = Array.from(table.tBodies[0].rows);
  const isNumeric = columnIndex !== 0; // Check if sorting numeric columns
  const isAscending = table.dataset.sortOrder !== "asc";

  // Sort rows based on the specified column
  rows.sort((rowA, rowB) => {
    const cellA =
      rowA.cells[columnIndex].dataset[
        isNumeric ? (columnIndex === 1 ? "rating" : "fee") : "value"
      ] || rowA.cells[columnIndex].innerText;
    const cellB =
      rowB.cells[columnIndex].dataset[
        isNumeric ? (columnIndex === 1 ? "rating" : "fee") : "value"
      ] || rowB.cells[columnIndex].innerText;

    if (isNumeric) {
      return isAscending ? cellA - cellB : cellB - cellA;
    } else {
      return isAscending
        ? cellA.localeCompare(cellB)
        : cellB.localeCompare(cellA);
    }
  });

  // Update table with sorted rows
  const tbody = table.tBodies[0];
  rows.forEach((row) => tbody.appendChild(row));

  // Update sort order
  table.dataset.sortOrder = isAscending ? "asc" : "desc";
}

fetchData();
