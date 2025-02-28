import { Box, Container, Heading, VStack } from "@chakra-ui/react";
import { useWizardStore } from "../hooks/useWizardStore";
import { ContactDetails } from "./FormSteps/ContactDetails";
import { LoanRequest } from "./FormSteps/LoanRequest";

const steps = [
  { title: "Contact Details", component: ContactDetails },
  { title: "Loan Request", component: LoanRequest },
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
        </Box>
        <CurrentStepComponent />
      </VStack>
    </Container>
  );
};
