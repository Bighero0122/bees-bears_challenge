import { VStack, HStack, Progress, Button } from "@chakra-ui/react";
import { useWizardStore } from "../hooks/useWizardStore";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
}: WizardNavigationProps) => {
  const { setStep } = useWizardStore();

  return (
    <VStack spacing={4} w="100%">
      <Progress
        value={(currentStep / totalSteps) * 100}
        w="100%"
        colorScheme="blue"
      />
      <HStack spacing={4} justify="space-between" w="100%">
        <Button
          onClick={() => setStep(currentStep - 1)}
          isDisabled={currentStep === 1}
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => setStep(currentStep + 1)}
          isDisabled={currentStep === totalSteps}
          colorScheme="blue"
        >
          Next
        </Button>
      </HStack>
    </VStack>
  );
};
