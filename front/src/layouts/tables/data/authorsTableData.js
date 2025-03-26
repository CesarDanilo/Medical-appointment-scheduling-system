import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import axios from "axios";
import { useState, useEffect } from "react";

// Images (seus imports de avatar...)
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

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
      const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

      const formattedRows = users.map((user, index) => ({
        name: <Author image={avatars[index % avatars.length]} name={user.name} email={user.email} />,
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