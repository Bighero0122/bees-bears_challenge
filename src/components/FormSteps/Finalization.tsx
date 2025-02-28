import { VStack, Text, Checkbox, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useWizardStore } from "../../hooks/useWizardStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Finalization = () => {
  const { data, updateData } = useWizardStore();
  const [confirmed, setConfirmed] = useState(false);

  const handleFinalize = async () => {
    if (!confirmed) return;
    await updateData({ confirmed: true });
    toast.success("Application submitted successfully!");
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontWeight="bold">Personal Information</Text>
        <Text>
          Name: {data.personalInfo?.firstName} {data.personalInfo?.lastName}
        </Text>
        <Text>Date of Birth: {data.personalInfo?.dateOfBirth}</Text>
      </Box>

      <Box>
        <Text fontWeight="bold">Contact Details</Text>
        <Text>Email: {data.contactDetails?.email}</Text>
        <Text>Phone: {data.contactDetails?.phone}</Text>
      </Box>

      <Box>
        <Text fontWeight="bold">Loan Details</Text>
        <Text>Amount: ${data.loanRequest?.loanAmount}</Text>
        <Text>Upfront Payment: ${data.loanRequest?.upfrontPayment}</Text>
        <Text>Terms: {data.loanRequest?.terms} months</Text>
      </Box>

      <Box>
        <Text fontWeight="bold">Financial Information</Text>
        <Text>Monthly Salary: ${data.financialInfo?.monthlySalary}</Text>
        {data.financialInfo?.hasAdditionalIncome && (
          <Text>Additional Income: ${data.financialInfo.additionalIncome}</Text>
        )}
        {data.financialInfo?.hasMortgage && (
          <Text>Mortgage: ${data.financialInfo.mortgage}</Text>
        )}
        {data.financialInfo?.hasOtherCredits && (
          <Text>Other Credits: ${data.financialInfo.otherCredits}</Text>
        )}
      </Box>

      <Checkbox
        isChecked={confirmed}
        onChange={(e) => setConfirmed(e.target.checked)}
      >
        I confirm that all the information provided is correct
      </Checkbox>

      <Button
        colorScheme="blue"
        isDisabled={!confirmed}
        onClick={handleFinalize}
      >
        Finalize Application
      </Button>
    </VStack>
  );
};
