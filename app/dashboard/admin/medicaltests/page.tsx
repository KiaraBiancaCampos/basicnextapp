import { query } from '@/lib/db';
import MedicalTestsClient from './MedicalTestsClient'; 

export const revalidate = 0;

export default async function MedicalTestsPage() {
  // Fetch data from DB
  const { rows } = await query(`
    SELECT mt.id, mt.name, tc.name AS category, u.name AS unit, mt.normalmin, mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u ON mt.iduom = u.id
    ORDER BY mt.id
  `);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Medical Tests</h1>
      <MedicalTestsClient rows={rows} />
    </div>
  );
}