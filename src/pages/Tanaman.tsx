import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableTanaman from "../components/tables/TanamanTable";

export default function Tanaman() {
  return (
    <>
      <PageMeta
        title="Tanaman"
        description="Halaman List Data Aset Tanaman"
      />
      <PageBreadcrumb pageTitle="Data Tanaman" />
      <div className="space-y-6">
          <TableTanaman />
      </div>
    </>
  );
}
