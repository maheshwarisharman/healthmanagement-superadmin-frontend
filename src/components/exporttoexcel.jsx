import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const exportToExcel = (data, filename) => {
  // Create a new workbook and add the data
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  // Generate buffer and save the file
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), filename);
};

export default exportToExcel;
