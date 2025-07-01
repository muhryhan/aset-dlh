import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaList from "../components/UserList/User";
import PageMeta from "../components/common/PageMeta";

export default function UserList() {
  return (
    <>
      <PageMeta
        title="Halaman pengguna"
        description="Ini adalah halaman pengguna"
      />
      <PageBreadcrumb pageTitle="Daftar Pengguna" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <UserMetaList />
        </div>
      </div>
    </>
  );
}
