import UserListClient from './componets/UserListClientts';

export default async function UserListPage() {
  let users = [];
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiUrl}/users`);
    if (!res.ok) throw new Error();
    users = await res.json();
  } catch (err) {
    return <div className="p-10 text-red-500">Failed to load users</div>;
  }



  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">User & Posts Dashboard</h1>
      <UserListClient initialUsers={users} />
    </main>
  );
}