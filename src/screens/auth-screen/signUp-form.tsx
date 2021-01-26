import React from 'react';
// import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import styles from './form.presets';
import Text from '../../components/Text/text';
// import { font } from '../../assets/fonts/HelveticaNowDisplay';
import Button from '../../components/Button/button';
import { useTranslation } from 'react-i18next';

// Shape of form values
interface FormValues {
  fullName: string;
  email: string;
  // password: string;
  firstDay: string;
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  const { t } = useTranslation();
  return (
    <Form>
      <Field
        type="text"
        name="fullName"
        as={styles.FieldStyle}
        placeholder={t('signUp:full_name')}
      />
      {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
      <Field type="email" name="email" as={styles.FieldStyle} placeholder={t('login:email')} />
      {touched.email && errors.email && <div>{errors.email}</div>}
      <Field
        type="text"
        name="firstDay"
        as={styles.FieldStyle}
        placeholder={t('signUp:first_day')}
      />
      {touched.firstDay && errors.firstDay && <div>{errors.firstDay}</div>}

      {/* <Field
        type="password"
        name="password"
        as={styles.FieldStyle}
        placeholder={t('login:password')}
      />
      {touched.password && errors.password && <div>{errors.password}</div>} */}

      <div style={styles.ButtonStyle}>
        <Button type="submit" disabled={isSubmitting} className={'primary'}>
          <Text size={30} letter_spacing="0.3em">
            {t('signUp:sign_up')}
          </Text>
        </Button>
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialFullName?: string;
  initialEmail?: string;
  // password?: string;
  firstDay?: string;
  onSignIn: (fullName: string, email: string, firstDay: string) => void;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      fullName: props.initialFullName,
      email: props.initialEmail,
      // password: props.password,
      firstDay: props.firstDay,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.fullName) {
      errors.fullName = 'Required';
      errors.email = 'Required';
      errors.firstDay = 'Required';
    }
    // else ...
    return errors;
  },

  handleSubmit: (values, { props: { onSignIn } }) => {
    // do submitting things
    console.log('values:', values);
    const { fullName, email, firstDay } = values;
    onSignIn(fullName, email, firstDay);
  },
})(InnerForm);

// Use <MyForm /> wherevs
const SignUpForm = ({ onSignIn }: CombinedProps) => (
  <div>
    <MyForm onSignIn={onSignIn} />
  </div>
);

type CombinedProps = {
  onSignIn: (fullName: string, email: string, firstDay: string) => void;
};

export default SignUpForm;
