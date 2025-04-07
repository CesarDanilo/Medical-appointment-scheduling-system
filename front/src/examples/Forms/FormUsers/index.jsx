import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import { Select, MenuItem } from "@mui/material";
import Icon from "@mui/material/Icon";

import { useState } from "react";

import saveUserToDatabase from "functions/saveUserToDatabase";

const FormUsers = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Paciente");

    const handleSaveUserData = () => {
        const dados = {
            name: name,
            email: email,
            password: password,
            role: role
        }
        if (saveUserToDatabase(dados)) {
            return window.alert("GRAVADO COM SÚCESSO");
        }
    }

    return (
        <VuiBox sx={{ width: "100%", maxWidth: "400px", mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
            <VuiBox sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Nome
                    </VuiTypography>
                    <VuiInput
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
                        Email
                    </VuiTypography>
                    <VuiInput
                        placeholder="Digite o email..."
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
            </VuiBox>
            <VuiBox sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Password
                    </VuiTypography>
                    <VuiInput
                        placeholder="Digite o password..."
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
                                    py: 1,  // Reduzi o padding vertical
                                    fontSize: "0.875rem",
                                    height: "1.5rem",  // Altura menor para o input
                                },
                                "& .MuiOutlinedInput-root": {
                                    height: "2.25rem",  // Altura total menor para o Select
                                }
                            }}
                        >
                            <MenuItem value="paciente">Paciente</MenuItem>
                            <MenuItem value="médico">Médico</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </VuiBox>
                    {/* BOTAO DE ADICIONAR E SALVAR */}
                    <VuiBox display="flex" alignItems="center" gap={1} sx={{ height: "100%" }}>
                        <VuiButton
                            color="info"
                            size="medium"
                            variant="text"
                            circular
                            iconOnly
                            sx={{ height: "2.25rem", width: "2.25rem" }}  // Altura igual ao Select
                        >
                            <Icon fontSize="small">add_circle</Icon>
                        </VuiButton>
                        <VuiButton
                            color="success"
                            size="medium"
                            variant="outlined"
                            iconOnly
                            sx={{ height: "2.25rem", width: "2.25rem" }}  // Altura igual ao Select
                            onClick={handleSaveUserData}
                        >
                            <Icon fontSize="small">checkCircleIcon</Icon>
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            </VuiBox>
        </VuiBox>
    )
}

export default FormUsers;   