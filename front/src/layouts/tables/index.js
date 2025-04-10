import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import VuiBox from "components/VuiBox";
import VuiAlert from "components/VuiAlert";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import FormUsers from "examples/Forms/FormUsers";
import useAuthorsTableData from "layouts/tables/data/authorsTableData";
import handleDeleteUser from "functions/deleteUserToDatabase";

function Tables() {
  const [refreshCount, setRefreshCount] = useState(0);
  const { columns, rows, loading, error } = useAuthorsTableData(refreshCount);
  const [save, setSave] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  const handleUserDelete = async (userId) => {
    const result = await handleDeleteUser(userId);

    setAlertMessage(result.message);
    setAlertColor(result.success ? "success" : "error");
    setShowAlert(true);

    if (result.success) {
      handleRefresh();
    }
  };

  useEffect(() => {
    if (save) {
      handleRefresh();
      setAlertMessage("Operação realizada com sucesso!");
      setAlertColor("success");
      setShowAlert(true);
      setSave(false);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [save]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {showAlert && (
              <VuiAlert
                color="success"
                dismissible
                onClose={() => setShowAlert(false)}
              >
                Operação realizada com sucesso!
              </VuiAlert>
            )}

            <VuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <VuiTypography variant="h6" color="white">
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
                flexDirection: "row",
                justifyContent: loading ? "center" : "flex-start",
                alignItems: loading ? "center" : "flex-start",
                p: 3,
                gap: 3
              }}
            >
              <FormUsers save={save} setSave={setSave} />
              <Table
                columns={columns}
                rows={rows}
                maxHeight={"450px"}
                onDelete={handleUserDelete}
                sx={{
                  width: '100%',
                  '& .MuiTableCell-root': {
                    py: 1.5,
                    fontSize: '0.875rem'
                  }
                }}
              />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Tables;