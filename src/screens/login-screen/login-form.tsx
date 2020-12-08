import React from 'react';
// import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import styles from './login-form.presets';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../redux';
import { userActionCreators } from '../../redux/user';
import DText from '../../components/Text/text';
import { font } from '../../fonts/HelveticaNowDisplay';

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
      <Field type="password" name="password" as={styles.FieldStyle} placeholder="password" />
      {touched.password && errors.password && <div>{errors.password}</div>}
      <DText font_family={font.light}>
        <Field type="checkbox" name="toogle" as={styles.FieldCheckStyled} />
        Remember this device
      </DText>
      <styles.Button type="submit" disabled={isSubmitting}>
        <DText size={30} letter_spacing="0.3em">
          Sign in
        </DText>
      </styles.Button>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string;
  loginUser: (email: string, password: string) => void;
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

  handleSubmit: (values, { props }) => {
    // do submitting things
    const { email, password } = values;
    props.loginUser(email, password);
  },
})(InnerForm);

// Use <MyForm /> wherevs
const LoginForm = ({ loginUser }: CombinedProps) => (
  <div>
    <MyForm loginUser={loginUser} />
  </div>
);

type CombinedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootState) => ({
  employeeAccount: state.user.employeeAccount,
  isLoading: state.user.isLoading,
  token: state.user.token,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUser: (email: string, password: string) =>
    dispatch(userActionCreators.loginUser(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
