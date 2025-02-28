import {
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Checkbox,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { financialInfoSchema } from "../../schemas/validation";
import { FinancialInfo as FinancialInfoType } from "../../types/wizard";
import { useWizardStore } from "../../hooks/useWizardStore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const FinancialInfo = () => {
  const { data, updateData, setStep } = useWizardStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FinancialInfoType>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: data.financialInfo,
  });

  const hasAdditionalIncome = watch("hasAdditionalIncome");
  const hasMortgage = watch("hasMortgage");
  const hasOtherCredits = watch("hasOtherCredits");

  const onSubmit = async (formData: FinancialInfoType) => {
    try {
      const { loanRequest } = data;
      const totalIncome =
        formData.monthlySalary + (formData.additionalIncome || 0);
      const totalExpenses =
        (formData.mortgage || 0) + (formData.otherCredits || 0);
      const availableIncome =
        (totalIncome - totalExpenses) * (loanRequest?.terms || 0) * 0.5;
      if (availableIncome > (loanRequest?.loanAmount || 0)) {
        await updateData({ financialInfo: formData });
        setStep(5);
      } else {
        toast.error(
          "Insufficient income for the requested loan. Please adjust the loan amount or start over."
        );
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.monthlySalary}>
          <FormLabel>Monthly Salary</FormLabel>
          <NumberInput>
            <NumberInputField
              {...register("monthlySalary", { valueAsNumber: true })}
            />
          </NumberInput>
          <FormErrorMessage>{errors.monthlySalary?.message}</FormErrorMessage>
        </FormControl>

        <Checkbox {...register("hasAdditionalIncome")}>
          I have additional income
        </Checkbox>

        {hasAdditionalIncome && (
          <FormControl isInvalid={!!errors.additionalIncome}>
            <FormLabel>Additional Income</FormLabel>
            <NumberInput>
              <NumberInputField
                {...register("additionalIncome", { valueAsNumber: true })}
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.additionalIncome?.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <Checkbox {...register("hasMortgage")}>I have a mortgage</Checkbox>

        {hasMortgage && (
          <FormControl isInvalid={!!errors.mortgage}>
            <FormLabel>Mortgage Payment</FormLabel>
            <NumberInput>
              <NumberInputField
                {...register("mortgage", { valueAsNumber: true })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.mortgage?.message}</FormErrorMessage>
          </FormControl>
        )}

        <Checkbox {...register("hasOtherCredits")}>
          I have other credits
        </Checkbox>

        {hasOtherCredits && (
          <FormControl isInvalid={!!errors.otherCredits}>
            <FormLabel>Other Credits Payment</FormLabel>
            <NumberInput>
              <NumberInputField
                {...register("otherCredits", { valueAsNumber: true })}
              />
            </NumberInput>
            <FormErrorMessage>{errors.otherCredits?.message}</FormErrorMessage>
          </FormControl>
        )}

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </form>
  );
};
