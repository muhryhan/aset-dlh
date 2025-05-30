"use client"; // kalau kamu pakai Next.js dan interaksi klien

import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";

type User = {
  id: number;
  username: string;
  password: string;
};

const users: User[] = [
  {
    id: 1,
    username: "uusaamaa",
    password: "$2b$10$xDfJ0KFXpWADElmXgl0CkeUqnyFnGRTGIypOOEAYn45wlbybPTlfi",
  },
  {
    id: 2,
    username: "admin",
    password: "$2b$10$cjl2KbxfR.xZKeTO2QoT/edHEpnTAEWqhO2yEFergdfDbl/wr5fPm",
  },
  {
    id: 3,
    username: "ryhan",
    password: "$2b$10$cjl2KbxfR.xZKeTO2QoT/bafhdDjfsfSjjfskfsJfk/hkj7Djssl",
  },
];

export default function User() {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<number, boolean>
  >({});

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Daftar Pengguna</h2>
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
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-left">
                  {user.username}
                </td>
                <td className="px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="font-mono truncate">
                      {visiblePasswords[user.id]
                        ? user.password
                        : "*".repeat(user.password.length)}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(user.id)}
                      className="ml-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex-shrink-0"
                      aria-label="Toggle Password Visibility"
                    >
                      {visiblePasswords[user.id] ? (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
