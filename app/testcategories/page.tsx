import { query } from '@/lib/db';

export const revalidate = 0;

export default async function CategoriesPage() {
  const { rows } = await query('SELECT * FROM testcategories ORDER BY id');

  return (
    <div>
      <h1>Medical Test Categories</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c: any) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}