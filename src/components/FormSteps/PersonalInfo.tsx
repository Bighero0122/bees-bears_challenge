import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button, // Added Button import
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../schemas/validation";
import { PersonalInfo as PersonalInfoType } from "../../types/wizard";
import { useWizardStore } from "../../hooks/useWizardStore";

export const PersonalInfo = () => {
  const { data, updateData, setStep } = useWizardStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, 
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
  });

  const onSubmit = async (formData: PersonalInfoType) => {
    try {
      await updateData({ personalInfo: formData });
      setStep(2);
    } catch (error) {
      throw error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input {...register("firstName")} />
          <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel>Last Name</FormLabel>
          <Input {...register("lastName")} />
          <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.dateOfBirth}>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" {...register("dateOfBirth")} />
          <FormErrorMessage>{errors.dateOfBirth?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </form>
  );
};