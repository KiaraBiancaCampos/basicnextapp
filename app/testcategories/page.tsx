import { query } from '@/lib/db';

export const revalidate = 0;

export default async function CategoriesPage() {
  const { rows } = await query('SELECT * FROM testcategories ORDER BY id');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Test Categories</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">ID</th>
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c: any) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{c.id}</td>
              <td className="border px-2 py-1 font-medium">{c.name}</td>
              <td className="border px-2 py-1 text-gray-600">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}