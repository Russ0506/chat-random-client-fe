import { styled } from "@mui/styles";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

export const StyledMaleIcon = styled(MaleIcon)(({ theme }) => ({
  fontSize: "3rem",
  transition: "0.2s ease-in-out",
  color: "#1793c3",
}));

export const StyledFemaleIcon = styled(FemaleIcon)(({ theme }) => ({
  fontSize: "3rem",
  transition: "0.2s ease-in-out",
  color: "#e37dcf",
}));
