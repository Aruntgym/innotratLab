import React, { useState } from "react";
import "./DynamicTable.css";

const TableCreator = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [cellWidth, setCellWidth] = useState(100);
  const [cellHeight, setCellHeight] = useState(30);
  const [showHeaders, setShowHeaders] = useState(false);

  const handleMouseOver = (row, col) => {
    setRows(row + 1);
    setCols(col + 1);
  };

  const handleHeaderToggle = () => {
    setShowHeaders(!showHeaders);
  };

  const handleRowsChange = (e) => {
    const newRows = parseInt(e.target.value, 10);
    setRows(newRows);
    const newTableData = [...tableData];
    while (newTableData.length < newRows) {
      newTableData.push(Array(cols).fill(""));
    }
    setTableData(newTableData.slice(0, newRows));
  };

  const handleColsChange = (e) => {
    const newCols = parseInt(e.target.value, 10);
    setCols(newCols);
    const newTableData = tableData.map((row) => {
      const newRow = [...row];
      while (newRow.length < newCols) {
        newRow.push("");
      }
      return newRow.slice(0, newCols);
    });
    setTableData(newTableData);

    const newHeaders = [...tableHeaders];
    while (newHeaders.length < newCols) {
      newHeaders.push(`Header ${newHeaders.length + 1}`);
    }
    setTableHeaders(newHeaders.slice(0, newCols));
  };

  const handleCellChange = (rowIdx, colIdx, value) => {
    const newTableData = [...tableData];
    newTableData[rowIdx][colIdx] = value;
    setTableData(newTableData);
  };

  const handleHeaderChange = (colIdx, value) => {
    const newHeaders = [...tableHeaders];
    newHeaders[colIdx] = value;
    setTableHeaders(newHeaders);
  };

  const createTable = () => {
    return (
      <table>
        {showHeaders && (
          <thead>
            <tr>
              {tableHeaders.map((header, colIdx) => (
                <th key={colIdx}>
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleHeaderChange(colIdx, e.target.value)}
                    style={{ width: `${cellWidth}px` }}
                  />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {[...Array(rows)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[...Array(cols)].map((_, colIdx) => (
                <td key={colIdx}>
                  <input
                    type="text"
                    value={tableData[rowIdx] ? tableData[rowIdx][colIdx] : ""}
                    onChange={(e) =>
                      handleCellChange(rowIdx, colIdx, e.target.value)
                    }
                    style={{
                      width: `${cellWidth}px`,
                      height: `${cellHeight}px`,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const gridSize = 10; // Define how big the selection grid should be

  return (
    <div className="table-creator">
      <div className="grid">
        {[...Array(gridSize)].map((_, row) => (
          <div key={row} className="grid-row">
            {[...Array(gridSize)].map((_, col) => (
              <div
                key={col}
                className={`grid-cell ${
                  row < rows && col < cols ? "selected" : ""
                }`}
                onMouseOver={() => handleMouseOver(row, col)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className="table-dimensions">
        {rows} rows {cols} columns
      </div>
      <div>
        <label>Rows:</label>
        <input type="number" value={rows} onChange={handleRowsChange} />
        <label>Columns:</label>
        <input type="number" value={cols} onChange={handleColsChange} />
        <label>Cell Width:</label>
        <input
          type="number"
          value={cellWidth}
          onChange={(e) => setCellWidth(e.target.value)}
        />
        <label>Cell Height:</label>
        <input
          type="number"
          value={cellHeight}
          onChange={(e) => setCellHeight(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={showHeaders}
            onChange={handleHeaderToggle}
          />
          Show Headers
        </label>
      </div>

      <div className="generated-table">
        {rows > 0 && cols > 0 && createTable()}
      </div>
    </div>
  );
};

export default TableCreator;
