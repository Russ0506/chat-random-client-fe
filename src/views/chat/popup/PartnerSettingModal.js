import { Dialog, Stack } from "@mui/material";
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
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
const steps = ["Fill data search", "Ready to find your partner"];

export default function PartnerSettingModal(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);

  const [outputData, setOutputData] = React.useState(false);
  const [isSaveDataSearch, setIsSaveDataSearch] = React.useState(false);
  const childEvents = { saveDataSearchPartnerSetting: () => {} };
  const submitRef = React.useRef();
  const searchRef = React.useRef();

  const handleNext = () => {
    // childEvents.saveDataSearchPartnerSetting()
    if (activeStep === 0) {
      submitRef.current.click();
      setActiveStep(activeStep + 1);
    }

    if (activeStep === 1) {
      setIsSearch(true);
      searchRef.current.click();
      // setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const takeDataSubmit = (event) => {
    setOutputData(event);
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
            takeDataSubmit={takeDataSubmit}
            userSetting={props.userSetting}
          />
        );
      case 1:
        // setOnClosePopUpSearch(true)
        return (
          <PartnerSettingView
            data={outputData}
            userSetting={props.userSetting}
            outIsSearch={outIsSearch}
            searchRef={searchRef}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      {/* <Loading show={isSubmit}></Loading> */}
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
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              borderBottom: "1px solid #e5e0e0",
              padding: "20px",
            }}
          >
            <Typography component="h5" variant="h5" sx={{ fontWeight: "600" }}>
              Ideal Partner
              <Typography variant="subtitle1">
                These preferences help us improve suggestion by determining who
                you will be matched.
              </Typography>
            </Typography>
            {/* <Button variant="contained">ahihi</Button> */}
          </Stack>
          <Stack alignItems="center">
            <Stepper
              activeStep={activeStep}
              sx={{ pt: 2, pb: 1, width: "75%" }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                    display: "flex",
                    mt: 2,
                    ml: 1,
                    mr: 3,
                    mb: 3,
                  }}
                >
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    disabled={isSearch && activeStep === 1}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ pl: "25px", pr: "25px" }}
                    // endIcon={
                    //   activeStep === steps.length - 1 ? (
                    //     <PersonSearchIcon />
                    //   ) : (
                    //     <KeyboardTabIcon />
                    //   )
                    // }
                  >
                    {activeStep === steps.length - 1 ? "Search" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Stack>

        {/* <DialogContentText sx={{ textAlign: "center", pt: 3 }}>
              These preferences help us suggest matches by determining who you will be matched.
            </DialogContentText>
            
             */}
      </Paper>
    </Dialog>
  );
}
