'use client'; 

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function MedicalTestsClient({ rows }: { rows: any[] }) {
  
  // Excel download function
  const downloadExcel = () => {
    const formattedData = rows.map(row => ({
      'Test Name': row.name,
      'Category': row.category,
      'Unit': row.unit,
      'Min Range': row.normalmin,
      'Max Range': row.normalmax
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Medical Tests');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buf], { type: 'application/octet-stream' });
   
    saveAs(blob, 'MedicalTests.xlsx');
  };

  // PDF download function
  const printPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); 
    doc.text('Medical Tests List', 14, 15);
    
    (doc as any).autoTable({
      head: [['Test Name', 'Category', 'Unit', 'Min', 'Max']],
      body: rows.map(r => [r.name, r.category, r.unit, r.normalmin, r.normalmax]),
      startY: 20,
    });
    
    doc.save('MedicalTests.pdf');
  };

  return (
    <>
      {/* Buttons */}
      <div className="mb-4">
        <button
          onClick={downloadExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors"
        >
          Download Excel
        </button>
        <button
          onClick={printPDF}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Print PDF
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Test Name</th>
            <th className="border px-4 py-2 text-left">Category</th>
            <th className="border px-4 py-2 text-left">Unit</th>
            <th className="border px-4 py-2 text-left">Min</th>
            <th className="border px-4 py-2 text-left">Max</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((mt: any) => (
            <tr key={mt.name} className="hover:bg-gray-50">
              <td className="border px-4 py-2 font-medium">{mt.name}</td>
              <td className="border px-4 py-2">{mt.category}</td>
              <td className="border px-4 py-2">{mt.unit}</td>
              <td className="border px-4 py-2 text-gray-600">{mt.normalmin}</td>
              <td className="border px-4 py-2 text-gray-600">{mt.normalmax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}