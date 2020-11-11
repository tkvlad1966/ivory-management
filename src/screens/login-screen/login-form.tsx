import React from 'react';
// import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
// import styled from 'styled-components';
// import COLORS from '../../utils/colors';
import styles from './login-form.presets';

// Shape of form values
interface FormValues {
  email: string;
  password: string;
  toogle: boolean;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div>
        <Field type="email" name="email" as={styles.FieldStyle} placeholder="email" />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <Field type="password" name="password" as={styles.FieldStyle} placeholder="password" />
        {touched.password && errors.password && <div>{errors.password}</div>}
      </div>
      <div>
        <Field type="checkbox" name="toogle" as={styles.FieldCheckStyled} />
        Remember this device
      </div>
      <styles.Button type="submit" disabled={isSubmitting}>
        Sign in
      </styles.Button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  // inputStyle?: ...;
  // buttonStyle: ...;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      password: '',
      toogle: false,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    // else ...
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
    console.log(values);
  },
})(InnerForm);

// Use <MyForm /> wherevs
const LoginForm = () => (
  <div>
    <MyForm />
  </div>
);

export default LoginForm;
