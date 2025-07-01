import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import TableAc from "../components/tables/AcTable";

export default function Ac() {
  return (
    <>
      <PageMeta title="Ac" description="Halaman List Data Aset Ac" />
      <PageBreadcrumb pageTitle="Data Ac" />
      <div className="space-y-6">
        <TableAc />
      </div>
    </>
  );
}
