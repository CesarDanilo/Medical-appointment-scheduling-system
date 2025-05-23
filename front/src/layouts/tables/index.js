import { useEffect, useState, useCallback } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiAlert from "components/VuiAlert";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import FormUsers from "examples/Forms/FormUsers";
import useAuthorsTableData from "layouts/tables/data/authorsTableData";
import handleDeleteUser from "functions/deleteUserToDatabase";
import getUserToDatabase from "functions/getUserToDatabase";

// IMPORTS MANTIDOS...

function Tables() {
  const [refreshCount, setRefreshCount] = useState(0);
  const { columns, rows, loading, error } = useAuthorsTableData(refreshCount);
  const [save, setSave] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [timeoutId, setTimeoutId] = useState(null);
  const [userData, setUserData] = useState();
  const [useIdUpdate, setUseIdUpdate] = useState();

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
    const tableContainer = document.querySelector(".MuiTableBody-root");
    if (tableContainer) tableContainer.scrollTop = 0;
  };

  const showNotification = useCallback((message, color) => {
    if (timeoutId) clearTimeout(timeoutId);
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlert(true);

    const newTimeoutId = setTimeout(() => setShowAlert(false), 2000);
    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  const handleUserDelete = async (userId) => {
    const result = await handleDeleteUser(userId);
    showNotification(result.message, result.success ? "success" : "error");
    if (result.success) handleRefresh();
  };

  const handleUpdateUser = async (userId) => {
    try {
      if (userId) {
        const response = await getUserToDatabase(userId);
        setUserData(response.data);
        setUseIdUpdate(userId);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      showNotification("Erro ao carregar dados do usuário", "error");
    }
  };

  useEffect(() => {
    if (save !== null) {
      handleRefresh(); // atualiza tabela ao salvar
      showNotification("Operação realizada com sucesso!", "success");
    }
  }, [save, showNotification]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {showAlert && (
              <VuiAlert color={alertColor} dismissible onClose={() => {
                setShowAlert(false);
                if (timeoutId) clearTimeout(timeoutId);
              }}>
                {alertMessage}
              </VuiAlert>
            )}

            <VuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <VuiTypography variant="h6" color="white">Usuários</VuiTypography>
              <VuiTypography
                variant="button"
                color="info"
                fontWeight="medium"
                onClick={handleRefresh}
                sx={{ cursor: 'pointer', px: 2, py: 1, borderRadius: '5px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
              >
                {loading ? 'Atualizando...' : 'Atualizar'}
              </VuiTypography>
            </VuiBox>

            {error && (
              <VuiBox p={2} textAlign="center">
                <VuiTypography variant="caption" color="error">{error}</VuiTypography>
              </VuiBox>
            )}

            <VuiBox
              sx={{
                minHeight: loading ? "200px" : "auto",
                display: "flex",
                flexDirection: "row",
                justifyContent: loading ? "center" : "flex-start",
                alignItems: loading ? "center" : "flex-start",
                p: 3,
                gap: 3
              }}
            >
              <FormUsers
                setSave={setSave}
                userData={userData}
                useIdUpdate={useIdUpdate}
                setUseIdUpdate={setUseIdUpdate}
              />

              <Table
                columns={columns}
                rows={rows}
                maxHeight="450px"
                onDelete={handleUserDelete}
                onUpdate={handleUpdateUser}
                sx={{
                  width: '100%',
                  overflowY: 'auto',
                  '& .MuiTableCell-root': {
                    py: 1.5,
                    fontSize: '0.875rem',
                  },
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