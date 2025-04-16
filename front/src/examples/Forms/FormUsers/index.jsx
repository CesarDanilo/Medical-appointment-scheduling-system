import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import { Select, MenuItem } from "@mui/material";
import Icon from "@mui/material/Icon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import saveUserToDatabase from "functions/saveUserToDatabase";

const FormUsers = ({ save, setSave, userData, useIdUpdate }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSaveUserData = async () => {
        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        const dados = {
            name: name.trim(),
            email: email.trim(),
            password: password,
            role: role
        };

        try {
            let success;
            if (useIdUpdate) {
                success = await saveUserToDatabase(dados, useIdUpdate);
            } else {
                success = await saveUserToDatabase(dados);
            }
            if (success) {
                setSave(!save);
                // Limpar formulário após salvar
                setName("");
                setEmail("");
                setPassword("");
                setRole("paciente");
            }
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            alert("Ocorreu um erro ao salvar o usuário");
        }
    };

    useEffect(() => {
        if (userData) {
            setName(userData[0].name);
            setEmail(userData[0].email);
            setPassword(userData[0].password);
            setRole(userData[0].role);
        }

    }, [userData]);
    return (
        <VuiBox sx={{
            width: "100%",
            maxWidth: "400px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
            // backgroundColor: "background.default",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
            {/* <VuiTypography variant="h6" color="white" mb={2}>
                Cadastrar Novo Usuário
            </VuiTypography> */}

            <VuiBox sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Nome *
                    </VuiTypography>
                    <VuiInput
                        value={name}
                        placeholder="Digite o nome completo..."
                        size="medium"
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiInputBase-input": {
                                py: 1.5,
                                fontSize: "0.875rem"
                            }
                        }}
                    />
                </VuiBox>

                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Email *
                    </VuiTypography>
                    <VuiInput
                        value={email}
                        placeholder="Digite o email..."
                        type="email"
                        fullWidth
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiInputBase-input": {
                                py: 1.5,
                                fontSize: "0.875rem"
                            }
                        }}
                    />
                </VuiBox>

                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Senha *
                    </VuiTypography>
                    <VuiInput
                        value={password}
                        placeholder="Digite a senha..."
                        type="password"
                        size="medium"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiInputBase-input": {
                                py: 1.5,
                                fontSize: "0.875rem"
                            }
                        }}
                    />
                </VuiBox>

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
                                }
                            }}
                        >
                            <MenuItem value="paciente">Paciente</MenuItem>
                            <MenuItem value="médico">Médico</MenuItem>
                            <MenuItem value="admin">Administrador</MenuItem>
                        </Select>
                    </VuiBox>

                    <VuiBox display="flex" alignItems="center" gap={1} sx={{ height: "100%" }}>
                        <VuiButton
                            color="info"
                            size="medium"
                            variant="text"
                            circular
                            iconOnly
                            sx={{ height: "2.25rem", width: "2.25rem" }}
                        >
                            <AddCircleIcon fontSize="small" />
                        </VuiButton>
                        <VuiButton
                            color="success"
                            size="medium"
                            variant="contained"
                            iconOnly
                            sx={{ height: "2.25rem", width: "2.25rem" }}
                            onClick={handleSaveUserData}
                        >
                            <CheckCircleIcon fontSize="small" />
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </VuiBox>
    );
};

FormUsers.propTypes = {
    save: PropTypes.bool.isRequired,
    setSave: PropTypes.func.isRequired
};

export default FormUsers;