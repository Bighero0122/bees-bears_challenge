import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanRequestSchema } from "../../schemas/validation";
import { LoanRequest as LoanRequestType } from "../../types/wizard";
import { useWizardStore } from "../../hooks/useWizardStore";

export const LoanRequest = () => {
  const { data, updateData, setStep } = useWizardStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanRequestType>({
    resolver: zodResolver(loanRequestSchema),
    defaultValues: data.loanRequest,
  });

  const onSubmit = async (formData: LoanRequestType) => {
    try {
      await updateData({ loanRequest: formData });
      setStep(4);
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.loanAmount}>
          <FormLabel>Loan Amount</FormLabel>
          <NumberInput min={10000} max={70000}>
            <NumberInputField
              {...register("loanAmount", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.loanAmount?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.upfrontPayment}>
          <FormLabel>Upfront Payment</FormLabel>
          <NumberInput>
            <NumberInputField
              {...register("upfrontPayment", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.upfrontPayment?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.terms}>
          <FormLabel>Terms (months)</FormLabel>
          <NumberInput min={10} max={30}>
            <NumberInputField {...register("terms", { valueAsNumber: true })} />
          </NumberInput>
          <FormErrorMessage>{errors.terms?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </form>
  );
};
