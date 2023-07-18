import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

function AgGrid({ rowData, columnDefs, pagination = false, page = 10 }) {
  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
  }));

  return (
    <div className="ag-theme-alpine w-full h-full">
      <AgGridReact
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs} // Column Defs for Columns
        defaultColDef={defaultColDef} // Default Column Properties
        pagination={pagination}
        paginationPageSize={page}
      ></AgGridReact>
    </div>
  );
}

export default AgGrid;
