import { Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PartnerSetting from "./PartnerSetting";
import PartnerSettingView from "./PartnerSettingView";

const steps = ["Fill data search", "Ready to find your partner"];
export default function PartnerSettingModal(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  
  const submitRef = React.useRef();
  const searchRef = React.useRef();

  const handleNext = (e) => {
    submitRef.current.click();
    setActiveStep(activeStep + 1);
  };

  const handleSearch = () => {
    setIsSearch(true);
    searchRef.current.click();
    props.onParing();
    setActiveStep(0);
    props.onClose();
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const outIsSearch = (event) => {
    setIsSearch(event);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PartnerSetting
            submitRef={submitRef}
            isSubmit={isSubmit}
          />
        );
      case 1:
        // setOnClosePopUpSearch(true)
        return (
            <PartnerSettingView
            outIsSearch={outIsSearch}
            searchRef={searchRef}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" sx={{ pt: 1 }}>
        <Typography
          component="span"
          variant="subtitle1"
          sx={{ fontWeight: "600" }}
        >
          Ideal Partner
          <Typography variant="subtitle2">
            These preferences help us improve suggestion by determining who you
            will be matched.
          </Typography>
        </Typography>
        <Stack alignItems="center">
          <Stepper activeStep={activeStep} sx={{ pt: 0.5, width: "100%" }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      </DialogTitle>
      <DialogContent dividers={true} sx={{ overflow: "auto" }}>
        <Paper
          sx={{
            my: { xs: 0, md: 0 },
            p: { xs: 0, md: 0 },
            minHeight: "400px",
            minWidth: "300px",
            width: "100%",
            height: "100%",
            boxShadow: "none",
          }}
        >
          <Stack
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment></React.Fragment>
              ) : (
                <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
              )}
            </React.Fragment>
          </Stack>

          {/* <DialogContentText sx={{ textAlign: "center", pt: 3 }}>
              These preferences help us suggest matches by determining who you will be matched.
            </DialogContentText>

             */}
        </Paper>
      </DialogContent>
      <DialogActions >
        <Box
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            display: "flex",
          }}
        >
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ ml: 1 }}>
              Back
            </Button>
          )}
          {/* <Button
            variant="contained"
            onClick={handleNext}
            sx={{ pl: "25px", pr: "25px" }}
          >
            {activeStep === steps.length - 1 ? "Search" : "Next"}
          </Button> */}

          {
            activeStep === 0 ?
              <Button
                // disabled={isSearch && activeStep === 1}
                variant="contained"
                onClick={handleNext}
                sx={{ pl: "25px", pr: "25px" }}
              >
                Next
              </Button> :
              <Button
                // disabled={isSearch && activeStep === 1}
                variant="contained"
                onClick={handleSearch}
                sx={{ pl: "25px", pr: "25px" }}
              >
                Search
              </Button>
          }
        </Box>
      </DialogActions>
    </Dialog>
  );
}
