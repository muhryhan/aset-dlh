import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableKendaraan from "../../components/tables/KendaraanTable"

export default function Kendaraan () {
    return (
        <>
      <PageMeta
        title="Kendaraan"
        description="Halaman List Data Aset Kendaraan"
      />
      <PageBreadcrumb pageTitle="Data Kendaraan" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Kendaraan">
          <TableKendaraan />
        </ComponentCard>
      </div>
    </>
    )
}