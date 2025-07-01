import { users } from "../../types/user";

export default function UserMetaList() {

  return (
    <div className="p-6 space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-center border border-gray-300 dark:border-gray-700">
                Nama Pengguna
              </th>
              <th className="px-4 py-2 text-center border border-gray-300 dark:border-gray-700">
                Kata Sandi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="px-4 py-3 text-center border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-left">
                  {user.username}
                </td>
                <td className="px-4 py-3 text-center border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono">
                  ********
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
