import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import { Select, MenuItem } from "@mui/material";
import { Type } from "ajv/dist/compile/util";
import { Password } from "@mui/icons-material";
import { useState } from "react";

const FormUsers = () => {
    const [role, setRole] = useState("paciente"); // Estado inicial

    return (
        <VuiBox sx={{ width: "100%", maxWidth: "400px", mx: "auto", display: "flex", flexDirection: "column", gap: 2}}>
            <VuiBox sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                <VuiBox>
                    <VuiTypography variant="body2" color="info" textGradient mb={1}>
                        Nome
                    </VuiTypography>
                    <VuiInput
                        placeholder="Digite o nome completo..."
                        size="medium"
                        fullWidth
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
                        Role
                    </VuiTypography>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: "transparent",
                            "& .MuiInputBase-input": {
                                py: 1.5,
                                fontSize: "0.875rem"
                            }
                        }}
                    >
                        <MenuItem value="paciente">Paciente</MenuItem>
                        <MenuItem value="médico">Médico</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </VuiBox>
            </VuiBox>
        </VuiBox>
    )
}

export default FormUsers;   