import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { useWizardStore } from "../hooks/useWizardStore";
import { PersonalInfo } from "./FormSteps/PersonalInfo";
import { ContactDetails } from "./FormSteps/ContactDetails";
import { LoanRequest } from "./FormSteps/LoanRequest";
import { FinancialInfo } from "./FormSteps/FinancialInfo";
import { Finalization } from "./FormSteps/Finalization";
import { WizardNavigation } from "./WizardNavigation";

const steps = [
  { title: "Personal Information", component: PersonalInfo },
  { title: "Contact Details", component: ContactDetails },
  { title: "Loan Request", component: LoanRequest },
  { title: "Financial Information", component: FinancialInfo },
  { title: "Finalization", component: Finalization },
];

export const WizardLayout = () => {
  const { currentStep } = useWizardStore();
  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" textAlign="center" mb={2}>
            {steps[currentStep - 1].title}
          </Heading>
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </Box>
        <CurrentStepComponent />
      </VStack>
    </Container>
  );
};
