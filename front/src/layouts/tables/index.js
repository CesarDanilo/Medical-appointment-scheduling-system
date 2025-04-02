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
            <VuiBox 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              p={3}
            >
              <VuiTypography variant="lg" color="white">
                Usuários
              </VuiTypography>
              <VuiBox display="flex" alignItems="center">
                <VuiTypography
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  onClick={handleRefresh}
                  sx={{
                    cursor: 'pointer',
                    px: 2,
                    py: 1,
                    borderRadius: '5px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  {loading ? 'Atualizando...' : 'Atualizar'}
                </VuiTypography>
              </VuiBox>
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
                p: 3
              }}
            >
              {loading ? (
                <CircularProgress color="info" />
              ) : (
                <Table 
                  columns={columns} 
                  rows={rows} 
                  sx={{
                    width: '100%',
                    '& .MuiTableCell-root': {
                      py: 1.5,
                      fontSize: '0.875rem'
                    }
                  }}
                />
              )}
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;