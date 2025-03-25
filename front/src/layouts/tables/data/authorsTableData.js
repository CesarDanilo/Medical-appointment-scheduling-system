import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

import axios from "axios";
import React, { useState, useEffect } from "react";

// Componente para renderizar o autor
function Author({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

// Componente principal da tabela
const AuthorsTableData = () => {
  const [tableData, setTableData] = useState({
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "role", align: "center" },
      { name: "data_de_criação", align: "center" },
    ],
    rows: []
  });

  // Função para buscar dados da API
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/");
      const users = response.data.data; // Acessa o array de usuários dentro de "data"

      // Mapeia os dados da API para o formato esperado pela tabela
      const formattedRows = users.map((user, index) => {
        // Seleciona um avatar com base no índice
        const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
        const avatar = avatars[index % avatars.length];

        return {
          name: <Author image={avatar} name={user.name} email={user.email} />,
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
        };
      });

      setTableData(prev => ({
        ...prev,
        rows: formattedRows
      }));

    } catch (error) {
      console.error("Erro ao buscar dados dos usuários:", error);
      // Você pode querer mostrar uma mensagem de erro para o usuário aqui
    }
  };

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchUserData();
  }, []);

  return tableData;
};

export default AuthorsTableData;