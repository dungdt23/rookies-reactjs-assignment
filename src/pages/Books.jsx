import * as React from 'react';
import DataTable from '../components/Table/DataTable';
import SearchBar from '../components/Bar/SearchBar';
import { Outlet } from 'react-router-dom';

const Books = () => {
  return (
    <div>
      <SearchBar />
      <DataTable />
    </div>
  );
};

export default Books;
