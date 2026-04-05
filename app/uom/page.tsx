import { query } from '@/lib/db';

export const revalidate = 0; // optional, disables caching

export default async function UOMPage() {
  const { rows } = await query('SELECT * FROM uom ORDER BY id');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Units of Measure</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1 text-left">ID</th>
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u: any) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{u.id}</td>
              <td className="border px-2 py-1 font-medium">{u.name}</td>
              <td className="border px-2 py-1 text-gray-600">{u.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}