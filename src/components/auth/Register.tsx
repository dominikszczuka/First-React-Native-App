import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { CustomTextInput } from 'src/components';
import * as Yup from 'yup';
import { CustomButton } from '../CustomButton';

export const Register: React.FC = () => {
  const validationSchema = () =>
    Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Please enter valid email').required('Email address id required'),
      password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
    });
  /** It is not necessary but just for clearer code and readability initial values and "real" constants should be put over main component code (line 7)
   * then you should also create appropriate interface and initialize corresponding variable with initial Values
   * */
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = () => {
    resetForm({});
  };

  const { handleChange, resetForm, values, errors, isValid, dirty } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <View>
      <CustomTextInput
        error={errors.name}
        onChangeText={handleChange('name')}
        value={values.name}
        placeholder="Name"
      />
      <CustomTextInput
        error={errors.email}
        onChangeText={handleChange('email')}
        value={values.email}
        placeholder="E-mail"
      />
      <CustomTextInput
        error={errors.password}
        onChangeText={handleChange('password')}
        value={values.password}
        placeholder="Password"
        securePassword
      />
      <CustomTextInput
        error={errors.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        value={values.confirmPassword}
        placeholder="Confirm Password"
        securePassword
      />
      <CustomButton label="Sign up" onPress={handleSubmit} disabled={!isValid || !dirty} />
    </View>
  );
};
