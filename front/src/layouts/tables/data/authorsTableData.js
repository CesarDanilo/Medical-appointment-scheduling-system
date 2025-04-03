import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import axios from "axios";
import { useState, useEffect } from "react";

function Author({ image, name, email }) {
  // (seu componente Author existente...)
}

const useAuthorsTableData = (refreshFlag) => {
  const [tableData, setTableData] = useState({
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "role", align: "center" },
      { name: "data_de_criação", align: "center" },
    ],
    rows: [],
    loading: true,
    error: null
  });

  const fetchUserData = async () => {
    try {
      setTableData(prev => ({ ...prev, loading: true, error: null }));

      const response = await axios.get("http://localhost:3001/user/");

      if (!response.data || !response.data.data) {
        throw new Error("Dados da API não estão no formato esperado");
      }

      const users = response.data.data;

      const formattedRows = users.map((user, index) => ({
        name: (
          <VuiTypography variant="caption" color="text" fontWeight="medium">
            {user.name}
          </VuiTypography>
        ),
        email: (
          <VuiTypography variant="caption" color="text" fontWeight="medium">
            {user.email}
          </VuiTypography>
        ),
        role: (
          <VuiTypography variant="caption" color="text" fontWeight="medium">
            {user.role}
          </VuiTypography>
        ),
        data_de_criação: (
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </VuiTypography>
        ),
      }));

      setTableData({
        columns: tableData.columns,
        rows: formattedRows,
        loading: false,
        error: null
      });

    } catch (error) {
      setTableData({
        columns: tableData.columns,
        rows: [],
        loading: false,
        error: error.message || "Erro ao carregar usuários"
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshFlag]);

  return tableData;
};

export default useAuthorsTableData;