import React from 'react';
// import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import styles from './form.presets';
import Text from '../../components/Text/text';
import Button from '../../components/Button/button';
import { useTranslation } from 'react-i18next';

// Shape of form values
interface FormValues {
  email: string;
  password: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const { t } = useTranslation();
  return (
    <Form>
      <div>
        <Field type="email" name="email" as={styles.FieldStyle} placeholder={t('login:email')} />
        {touched.email && errors.email && <div>{errors.email}</div>}
      </div>
      <Field
        type="password"
        name="password"
        as={styles.FieldStyle}
        placeholder={t('login:password')}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <div style={styles.ButtonStyle}>
        <Button type="submit" disabled={isSubmitting} className={'primary'}>
          <Text size={30} letter_spacing="0.3em">
            {t('login:sign_in')}
          </Text>
        </Button>
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  onSignIn: (email: string, password: string) => void;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail,
      password: props.initialPassword || 'password',
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

  handleSubmit: (values, { props: { onSignIn } }) => {
    // do submitting things
    const { email, password } = values;
    onSignIn(email, password);
  },
})(InnerForm);

// Use <MyForm /> wherevs
const LoginForm = ({ onSignIn }: CombinedProps) => (
  <div>
    <MyForm onSignIn={onSignIn} />
  </div>
);

type CombinedProps = { onSignIn: (email: string, password: string) => void };

export default LoginForm;
