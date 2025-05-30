import ComponentCard from "../../components/common/ComponentCard"
import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import PageMeta from "../../components/common/PageMeta"
import TableSerberAc from "../../components/tables/PeriodicService/SerberAcTable"

export default function SerberAc () {
    return (
        <>
      <PageMeta
        title="Servis Berkala Ac"
        description="Ini adalah halamn servis berkala ac"
      />
      <PageBreadcrumb pageTitle="Berkala AC" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Riwayat Servis Berkala AC">
          <TableSerberAc />
        </ComponentCard>
      </div>
    </>
    )
}