import { query } from '@/lib/db';

export const revalidate = 0; // optional, disables caching

export default async function UOMPage() {
  const { rows } = await query('SELECT * FROM uom ORDER BY id');

  return (
    <div>
      <h1>Units of Measure</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u: any) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}