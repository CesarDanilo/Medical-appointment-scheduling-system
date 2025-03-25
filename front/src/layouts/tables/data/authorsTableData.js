import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

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

// Componente para renderizar a função
function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

// Componente principal da tabela
const AuthorsTableData = () => {
  const [rows, setRows] = useState([]);

  // Função para buscar dados da API
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user/");
      const users = response.data.data; // Acessa o array de usuários dentro de "data"

      console.log("Dados recebidos da API:", users);

      // Mapeia os dados da API para o formato esperado pela tabela
      const formattedRows = users.map((user, index) => {
        // Seleciona um avatar com base no índice (ou use uma lógica personalizada)
        const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
        const avatar = avatars[index % avatars.length]; // Usa avatars em ciclo

        return {
          name: <Author image={avatar} name={user.name} email={user.email} />,
          email: (
            <VuiTypography variant="caption" color="text" fontWeight="medium">
              {user.email}
            </VuiTypography>
          ),
          password: (
            <VuiTypography variant="caption" color="text" fontWeight="medium">
              *******
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

      console.log("Linhas formatadas:", formattedRows);
      return formattedRows; // Retorna as linhas formatadas
    } catch (error) {
      console.error("Erro ao buscar dados dos usuários:", error);
      return []; // Retorna um array vazio em caso de erro
    }
  };

  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    columns: [
      { name: "name", align: "left" },
      { name: "email", align: "left" },
      { name: "password", align: "center" },
      { name: "role", align: "center" },
      { name: "data_de_criação", align: "center" },
    ],
    rows,
  };
};

export default AuthorsTableData;