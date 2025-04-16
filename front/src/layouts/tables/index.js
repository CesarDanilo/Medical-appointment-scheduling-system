import { useEffect, useState, useCallback } from "react";
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
import updateUserToDatabase from "functions/updateUserToDatabase";
import getUserToDatabase from "functions/getUserToDatabase";
import axios from "axios";

function Tables() {
  const [refreshCount, setRefreshCount] = useState(0);
  const { columns, rows, loading, error } = useAuthorsTableData(refreshCount);
  const [save, setSave] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("success");
  const [timeoutId, setTimeoutId] = useState(null);
  const [userData, setUserData] = useState();

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  const showNotification = useCallback((message, color) => {
    // Limpa qualquer timeout existente
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    setAlertMessage(message);
    setAlertColor(color);
    setShowAlert(true);

    // Configura novo timeout para esconder após 2 segundos
    const newTimeoutId = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    setTimeoutId(newTimeoutId);
  }, [timeoutId]);

  const handleUserDelete = async (userId) => {
    const result = await handleDeleteUser(userId);

    showNotification(
      result.message,
      result.success ? "success" : "error"
    );

    if (result.success) {
      handleRefresh();
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      if (userId) {
        try {
          const response = await getUserToDatabase(userId);
          setUserData(response.data);
        } catch (error) {
          console.log(error)
        }
      }

      // const result = await updateUserToDatabase(userId);

      if (result.success) {
        handleRefresh();
      }

    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (save) {
      handleRefresh();
      showNotification("Operação realizada com sucesso!", "success");
      setSave(false);
    }
  }, [save, showNotification]);

  useEffect(() => {
    return () => {
      // Limpa o timeout quando o componente desmontar
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {showAlert && (
              <VuiAlert
                color={alertColor}
                dismissible
                onClose={() => {
                  setShowAlert(false);
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                }}
              >
                {alertMessage}
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
              <FormUsers save={save} setSave={setSave} userData={userData} />
              <Table
                columns={columns}
                rows={rows}
                maxHeight={"450px"}
                onDelete={handleUserDelete}
                onUpdate={handleUpdateUser}
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