import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";

import { Select, MenuItem } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import saveUserToDatabase from "functions/saveUserToDatabase";

const FormUsers = ({ setSave, userData, useIdUpdate, setUseIdUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("paciente");

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCpf("");
    setRole("paciente");
    setUseIdUpdate("");
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);
  const isCpfValid = (cpf) => /^\d{11}$/.test(cpf.replace(/\D/g, ""));

  const handleSaveUserData = async () => {
    if (!name || !email || !password || !cpf) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Email inválido.");
      return;
    }

    if (!isCpfValid(cpf)) {
      alert("CPF deve conter 11 dígitos numéricos.");
      return;
    }

    const dados = {
      name: name.trim(),
      email: email.trim(),
      password,
      cpf: cpf.trim(),
      role,
    };

    try {
      const success = useIdUpdate
        ? await saveUserToDatabase(dados, useIdUpdate)
        : await saveUserToDatabase(dados);

      if (success) {
        setSave(Date.now()); // apenas aqui força a atualização
        clearForm();
        window.scrollTo({ top: 0, behavior: "smooth" }); // força scroll para topo
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Ocorreu um erro ao salvar o usuário.");
    }
  };

  useEffect(() => {
    if (Array.isArray(userData) && userData.length > 0) {
      const user = userData[0];
      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(user.password || "");
      setCpf(user.cpf || "");
      setRole(user.role || "paciente");
    }
  }, [userData]);

  return (
    <VuiBox
      sx={{
        width: "100%",
        maxWidth: "400px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {[{ label: "Nome *", value: name, setter: setName, placeholder: "Digite o nome completo..." },
        { label: "Email *", value: email, setter: setEmail, placeholder: "Digite o email...", type: "email" },
        { label: "CPF *", value: cpf, setter: setCpf, placeholder: "Digite o CPF...", type: "text" },
        { label: "Senha *", value: password, setter: setPassword, placeholder: "Digite a senha...", type: "password" }]
        .map(({ label, value, setter, placeholder, type = "text" }, i) => (
          <VuiBox key={i}>
            <VuiTypography variant="body2" color="info" textGradient mb={1}>
              {label}
            </VuiTypography>
            <VuiInput
              value={value}
              type={type}
              placeholder={placeholder}
              fullWidth
              onChange={(e) => setter(e.target.value)}
              sx={{
                backgroundColor: "transparent",
                "& .MuiInputBase-input": { py: 1.5, fontSize: "0.875rem" },
              }}
            />
          </VuiBox>
        ))}

      <VuiBox display="flex" justifyContent="space-between" alignItems="flex-end" gap={1}>
        <VuiBox flex={1}>
          <VuiTypography variant="body2" color="info" textGradient mb={1}>
            Tipo
          </VuiTypography>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "transparent",
              "& .MuiInputBase-input": {
                py: 1,
                fontSize: "0.875rem",
                height: "1.5rem",
              },
              "& .MuiOutlinedInput-root": {
                height: "2.25rem",
              },
            }}
          >
            <MenuItem value="paciente">Paciente</MenuItem>
            <MenuItem value="médico">Médico</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
          </Select>
        </VuiBox>

        <VuiBox display="flex" alignItems="center" gap={1}>
          <VuiButton
            color="info"
            variant="text"
            circular
            iconOnly
            onClick={clearForm}
            sx={{ height: "2.25rem", width: "2.25rem" }}
            aria-label="Limpar"
          >
            <AddCircleIcon fontSize="small" />
          </VuiButton>
          <VuiButton
            color="success"
            variant="contained"
            iconOnly
            onClick={handleSaveUserData}
            sx={{ height: "2.25rem", width: "2.25rem" }}
            aria-label="Salvar"
          >
            <CheckCircleIcon fontSize="small" />
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </VuiBox>
  );
};

FormUsers.propTypes = {
  setSave: PropTypes.func.isRequired,
  userData: PropTypes.array,
  useIdUpdate: PropTypes.string,
  setUseIdUpdate: PropTypes.func,
};

export default FormUsers;
