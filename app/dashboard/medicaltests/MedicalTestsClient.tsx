'use client'; 

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function MedicalTestsClient({ rows }: { rows: any[] }) {
  
  // Excel download function
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Medical Tests');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buf], { type: 'application/octet-stream' });
    saveAs(blob, 'MedicalTests.xlsx');
  };

  // PDF download function
  const printPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4'); 
    doc.text('Medical Tests', 14, 15);
    (doc as any).autoTable({
      head: [['Test Name', 'Category', 'Unit', 'Min', 'Max']],
      body: rows.map((r: any) => [r.name, r.category, r.unit, r.normalmin, r.normalmax]),
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
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Download Excel
        </button>
        <button
          onClick={printPDF}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Print PDF
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Test Name</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Min</th>
            <th className="border px-2 py-1">Max</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((mt: any) => (
            <tr key={mt.name}>
              <td className="border px-2 py-1">{mt.name}</td>
              <td className="border px-2 py-1">{mt.category}</td>
              <td className="border px-2 py-1">{mt.unit}</td>
              <td className="border px-2 py-1">{mt.normalmin}</td>
              <td className="border px-2 py-1">{mt.normalmax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}