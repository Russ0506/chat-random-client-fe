import { Dialog, DialogContentText } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import PartnerSetting from './PartnerSetting';
import PartnerSettingView from './PartnerSettingView';

const steps = ['Fill data search', 'Ready to find your partner'];



const theme = createTheme();

export default function PartnerSettingModal(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);

  const [outputData, setOutputData] = React.useState(false);
  const [isSaveDataSearch, setIsSaveDataSearch] = React.useState(false);
  const childEvents = { saveDataSearchPartnerSetting: () => { } };
  const submitRef = React.useRef();
  const searchRef = React.useRef();

  const handleNext = () => {
    // childEvents.saveDataSearchPartnerSetting()
    if (activeStep === 0) {
      submitRef.current.click()
      setActiveStep(activeStep + 1);
    }

    if (activeStep === 1) {
      setIsSearch(true)
      searchRef.current.click()
      // setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const takeDataSubmit = (event) => {
    setOutputData(event)
  }

  const outIsSearch= (event) => {
    setIsSearch(event)
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PartnerSetting submitRef={submitRef} isSubmit={isSubmit} takeDataSubmit={takeDataSubmit} userSetting={props.userSetting}/>;
      case 1:
        // setOnClosePopUpSearch(true)
        return <PartnerSettingView data={outputData} userSetting={props.userSetting} outIsSearch={outIsSearch} searchRef={searchRef}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth
      maxWidth="lg">
      <ThemeProvider theme={theme}>
        <Container component="main" sx={{ minWidth: "800px" }}>
          {/* <Loading show={isSubmit}></Loading> */}

          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },  minHeight:"700px" }}>
            <Typography component="h1" variant="h4" align="center">
              IDEAL PARTNER
            </Typography>
            <DialogContentText sx={{ textAlign: "center", pt: 3 }}>
              These preferences help us suggest matches by determining who you will be matched.
            </DialogContentText>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, width: "60%", ml: "25%" }} >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      disabled = {isSearch && activeStep === 1}
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? 'Search' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </Dialog>
  );
}