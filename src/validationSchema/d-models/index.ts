import * as yup from 'yup';

export const dModelValidationSchema = yup.object().shape({
  model_name: yup.string().required(),
  university_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
