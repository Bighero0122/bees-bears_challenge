import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactDetailsSchema } from "../../schemas/validation";
import { ContactDetails as ContactDetailsType } from "../../types/wizard";
import { useWizardStore } from "../../hooks/useWizardStore";

export const ContactDetails = () => {
  const { data, updateData, setStep } = useWizardStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsType>({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: data.contactDetails,
  });

  const onSubmit = async (formData: ContactDetailsType) => {
    try {
      await updateData({ contactDetails: formData });
    setStep(3);
    } catch (error) {
      throw error
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} type="text" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone (E.164 format)</FormLabel>
          <Input {...register("phone")} placeholder="+1234567890" />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </form>
  );
};
