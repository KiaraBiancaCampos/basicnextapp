import { query } from '@/lib/db';

export const revalidate = 0;

export default async function MedicalTestsPage() {
  const { rows } = await query(`
    SELECT mt.name, tc.name AS category, u.name AS unit, mt.normalmin, mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u ON mt.iduom = u.id
    ORDER BY mt.id
  `);

  return (
    <div>
      <h1>Medical Tests</h1>
      <table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Category</th>
            <th>Unit</th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((mt: any, index: number) => (
            <tr key={index}>
              <td>{mt.name}</td>
              <td>{mt.category}</td>
              <td>{mt.unit}</td>
              <td>{mt.normalmin}</td>
              <td>{mt.normalmax}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}