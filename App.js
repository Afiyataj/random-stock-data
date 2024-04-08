document.addEventListener("DOMContentLoaded", function () {
  const data = {
    "data": [
      {
        "stockName": "Macrosoft",
        "info": [
          { "date": "Mar 1, 2024", "open": 10, "close": 11 },
          { "date": "Mar 2, 2024", "open": 12, "close": 11 },
          { "date": "Mar 3, 2024", "open": 10, "close": 5 },
          { "date": "Mar 4, 2024", "open": 5, "close": 9 },
          { "date": "Mar 5, 2024", "open": 10, "close": 13 },
          { "date": "Mar 6, 2024", "open": 14, "close": 7 },
          { "date": "Mar 7, 2024", "open": 5, "close": 11 },
          { "date": "Mar 8, 2024", "open": 10, "close": 11 },
          { "date": "Mar 9, 2024", "open": 11, "close": 10 },
          { "date": "Mar 10, 2024", "open": 10, "close": 11 },
          { "date": "Mar 11, 2024", "open": 11, "close": 11 }
        ]
      },
      {
        "stockName": "Doogle",
        "info": [
          { "date": "Mar 1, 2024", "open": 20, "close": 21 },
          { "date": "Mar 2, 2024", "open": 21, "close": 21 },
          { "date": "Mar 3, 2024", "open": 21, "close": 21 },
          { "date": "Mar 4, 2024", "open": 21, "close": 18 },
          { "date": "Mar 5, 2024", "open": 17, "close": 15 },
          { "date": "Mar 6, 2024", "open": 16, "close": 15 },
          { "date": "Mar 7, 2024", "open": 16, "close": 18 },
          { "date": "Mar 8, 2024", "open": 22, "close": 18 },
          { "date": "Mar 9, 2024", "open": 19, "close": 19 },
          { "date": "Mar 10, 2024", "open": 16, "close": 17 },
          { "date": "Mar 11, 2024", "open": 17, "close": 19 }
        ]
      }
    ]
  };

  const stockSelect = document.getElementById("stock-select");
  const daysSelect = document.getElementById("days-select");
  const stockTable = document.getElementById("stock-table");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageNumber = document.getElementById("page-number");

  let selectedStock = data.data[0];
  let numDaysPerPage = parseInt(daysSelect.value);
  let currentPage = 1;

  // Function to populate stock options in dropdown
  const populateStockOptions = () => {
    data.data.forEach(stock => {
      const option = document.createElement("option");
      option.textContent = stock.stockName;
      option.value = stock.stockName;
      stockSelect.appendChild(option);
    });
  };

  // Function to populate stock table
  const populateStockTable = () => {
    const startIndex = (currentPage - 1) * numDaysPerPage;
    const endIndex = startIndex + numDaysPerPage;
    const stockInfo = selectedStock.info.slice(startIndex, endIndex);
    stockTable.innerHTML = `
      <thead>
        <tr>
          <th>Date</th>
          <th>Open</th>
          <th>Close</th>
        </tr>
      </thead>
      <tbody>
        ${stockInfo.map(entry => `
          <tr>
            <td>${entry.date}</td>
            <td class="${entry.open > entry.close ? 'red' : 'green'}">${entry.open}</td>
            <td class="${entry.close > entry.open ? 'green' : 'red'}">${entry.close}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  };

  // Function to update pagination buttons and page number display
  const updatePagination = () => {
    const totalPages = Math.ceil(selectedStock.info.length / numDaysPerPage);
    pageNumber.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  };

  // Event listener for stock select change
  stockSelect.addEventListener("change", () => {
    selectedStock = data.data.find(stock => stock.stockName === stockSelect.value);
    currentPage = 1;
    populateStockTable();
    updatePagination();
  });

  // Event listener for days select change
  daysSelect.addEventListener("change", () => {
    numDaysPerPage = parseInt(daysSelect.value);
    currentPage = 1;
    populateStockTable();
    updatePagination();
  });

  // Event listener for previous button
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      populateStockTable();
      updatePagination();
    }
  });

  // Event listener for next button
  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(selectedStock.info.length / numDaysPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      populateStockTable();
      updatePagination();
    }
  });

  // Initialize the app
  populateStockOptions();
  populateStockTable();
  updatePagination();
});
