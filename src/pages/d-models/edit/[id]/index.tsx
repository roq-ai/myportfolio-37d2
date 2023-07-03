import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getDModelById, updateDModelById } from 'apiSdk/d-models';
import { Error } from 'components/error';
import { dModelValidationSchema } from 'validationSchema/d-models';
import { DModelInterface } from 'interfaces/d-model';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UniversityInterface } from 'interfaces/university';
import { UserInterface } from 'interfaces/user';
import { getUniversities } from 'apiSdk/universities';
import { getUsers } from 'apiSdk/users';

function DModelEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<DModelInterface>(
    () => (id ? `/d-models/${id}` : null),
    () => getDModelById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: DModelInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateDModelById(id, values);
      mutate(updated);
      resetForm();
      router.push('/d-models');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<DModelInterface>({
    initialValues: data,
    validationSchema: dModelValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit D Model
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="model_name" mb="4" isInvalid={!!formik.errors?.model_name}>
              <FormLabel>Model Name</FormLabel>
              <Input type="text" name="model_name" value={formik.values?.model_name} onChange={formik.handleChange} />
              {formik.errors.model_name && <FormErrorMessage>{formik.errors?.model_name}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UniversityInterface>
              formik={formik}
              name={'university_id'}
              label={'Select University'}
              placeholder={'Select University'}
              fetcher={getUniversities}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'd_model',
    operation: AccessOperationEnum.UPDATE,
  }),
)(DModelEditPage);
