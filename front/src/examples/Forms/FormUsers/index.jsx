import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";

const FormUsers = () => {
    return (
        <VuiBox sx={{ width: "100%", maxWidth: "800px", mx: "auto", display: "flex", flexDirection: "row"}}>
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
        </VuiBox>
    )
}
    
export default FormUsers;   