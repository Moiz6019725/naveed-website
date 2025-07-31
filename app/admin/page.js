// app/admin/page.jsx (server component)
import ClientAdminPanel from '../components/ClientAdminPanel';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const session = verifyToken(token); // This is safe here

  if (!session) {
    return <div>Unauthorized</div>;
  }

  return <ClientAdminPanel session={session} />;
}
