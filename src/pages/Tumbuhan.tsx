import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableTumbuhan from "../components/tables/TumbuhanTable";

export default function Tumbuhan() {
  return (
    <>
      <PageMeta
        title="Tumbuhan"
        description="Halaman List Data Aset Tumbuhan"
      />
      <PageBreadcrumb pageTitle="Data Tumbuhan" />
      <div className="space-y-6">
          <TableTumbuhan />
      </div>
    </>
  );
}
