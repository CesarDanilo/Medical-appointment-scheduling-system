import { useState } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import useAuthorsTableData from "layouts/tables/data/authorsTableData";

function Tables() {
  const [refreshCount, setRefreshCount] = useState(0);
  const { columns, rows, loading, error } = useAuthorsTableData(refreshCount);

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Usuários
              </VuiTypography>
              <VuiTypography
                variant="button"
                color="info"
                fontWeight="medium"
                onClick={handleRefresh}
                style={{ cursor: 'pointer' }}
              >
                {loading ? 'Atualizando...' : 'Atualizar'}
              </VuiTypography>
            </VuiBox>

            {error && (
              <VuiBox p={2} textAlign="center">
                <VuiTypography variant="caption" color="error">
                  {error}
                </VuiTypography>
              </VuiBox>
            )}

            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
                minHeight: loading ? "200px" : "auto",
                display: "flex",
                justifyContent: loading ? "center" : "flex-start",
                alignItems: loading ? "center" : "flex-start",
              }}
            >
              {loading ? (
                <CircularProgress color="info" />
              ) : (
                <Table columns={columns} rows={rows} />
              )}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;