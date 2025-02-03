// function sortTable(columnIndex) {
//   const table = document.getElementById("agentTable");
//   const rows = Array.from(table.rows).slice(1); // Exclude the header row
//   const isNumeric = columnIndex !== 0; // Numeric sorting for Rating and Fee

//   rows.sort((a, b) => {
//     const cellA = a.cells[columnIndex].textContent.trim();
//     const cellB = b.cells[columnIndex].textContent.trim();

//     if (isNumeric) {
//       return (
//         parseFloat(cellA.replace(/[^0-9.-]+/g, "")) -
//         parseFloat(cellB.replace(/[^0-9.-]+/g, ""))
//       );
//     } else {
//       return cellA.localeCompare(cellB);
//     }
//   });

//   // Re-append sorted rows to the table body
//   const tbody = table.querySelector("tbody");
//   rows.forEach((row) => tbody.appendChild(row));
// }

// // Dynamic testing for ratings
// document.querySelectorAll("td[data-rating]").forEach((cell) => {
//   cell.addEventListener("click", () => {
//     const newRating = prompt("Enter new rating (0-100):");
//     if (newRating !== null && !isNaN(newRating)) {
//       const rating = Math.max(0, Math.min(100, parseInt(newRating))); // Ensure rating is between 0 and 100
//       cell.setAttribute("data-rating", rating);
//       cell.textContent = rating;

//       // Apply color coding dynamically
//       if (rating === 100) {
//         cell.style.color = "green";
//       } else if (rating >= 90) {
//         cell.style.color = "blue";
//       } else {
//         cell.style.color = "purple";
//       }
//     }
//   });
// });
