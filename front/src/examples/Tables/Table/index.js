import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows, maxHeight, onDelete }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const handleDelete = (rowIndex) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      onDelete(rowIndex);
    }
  };

  const renderColumns = columns.map(({ name, align, width }, key) => {
    const pl = key === 0 ? 3 : 1;
    const pr = key === columns.length - 1 ? 3 : 1;

    return (
      <VuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="white"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        {name.toUpperCase()}
      </VuiBox>
    );
  });

  const renderRows = rows.map((row, rowIndex) => {
    const rowKey = `row-${rowIndex}`;
    const hasBorder = row.hasBorder || false;

    const tableCells = columns.map(({ name, align }) => {
      const cellContent = Array.isArray(row[name]) ? row[name][1] : row[name];

      return (
        <VuiBox
          key={uuidv4()}
          component="td"
          p={1}
          textAlign={align}
          borderBottom={hasBorder ? `${borderWidth[1]} solid ${grey[400]}` : null}
        >
          <VuiTypography
            variant="button"
            fontWeight="regular"
            color="white"
            sx={{ display: "inline-block", width: "max-content" }}
          >
            {cellContent}
          </VuiTypography>
        </VuiBox>
      );
    });

    return (
      <TableRow key={rowKey}>
        {tableCells}
        <VuiBox
          component="td"
          p={1}
          borderBottom={hasBorder ? `${borderWidth[1]} solid ${grey[400]}` : null}
        >
          <VuiBox display="flex" alignItems="center" gap={1}>
            <VuiButton
              color="info"
              size="medium"
              variant="text"
              circular
              iconOnly
            >
              <Icon fontSize="medium">edit</Icon>
            </VuiButton>
            <VuiButton
              color="error"
              size="medium"
              variant="text"
              circular
              iconOnly
              onClick={() => handleDelete(rowIndex)}
            >
              <Icon fontSize="medium">delete</Icon>
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </TableRow>
    );
  });

  return useMemo(
    () => (
      <TableContainer
        sx={{
          maxHeight: maxHeight,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: grey[600],
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: grey[800],
          }
        }}
      >
        <MuiTable sx={{ tableLayout: 'auto' }} stickyHeader>
          <VuiBox component="thead">
            <TableRow>
              {renderColumns}
              <VuiBox
                component="th"
                pt={1.5}
                pb={1.25}
                pl={3}
                pr={3}
                fontSize={size.xxs}
                fontWeight={fontWeightBold}
                color="white"
                opacity={0.7}
                borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
              >
                AÇÕES
              </VuiBox>
            </TableRow>
          </VuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows, maxHeight, onDelete]
  );
}

Table.defaultProps = {
  columns: [],
  rows: [{}],
  maxHeight: "400px",
  onDelete: () => { } // Função vazia como padrão
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDelete: PropTypes.func // Adicionamos a prop para a função de deletar
};

export default Table; 