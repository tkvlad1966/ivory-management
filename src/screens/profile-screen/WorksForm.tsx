import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { ProfileType } from '../../services/api/api.types';
import moment from 'moment';
import styled from 'styled-components';
import * as Yup from 'yup';
import { IsErrorField } from '../../utils/functions';

const Work = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr 1fr;
  margin: 20px 180px 30px 350px;
`;

interface WorksFormProps {
  profile: ProfileType;
  handleSubmit: (values) => void;
}

type WorkEditType = {
  name: string;
  status: string;
  firstDay: string | null;
  lastDay: string;
  edit: boolean;
};

export const WorksForm: FC<WorksFormProps> = (props) => {
  const { profile, handleSubmit } = props;

  const workExperience: WorkEditType[] = profile?.workExperience.map((item, index) => {
    return {
      name: item.name,
      status: item.status,
      firstDay: moment(item.firstDay).format('YYYY-MM-DD'),
      lastDay: moment(item.lastDay).format('YYYY-MM-DD'),
      edit: true,
    };
  });

  const initialValues = { workExperience };

  const validateSchema = Yup.object().shape({
    workExperience: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        status: Yup.string().required('Status is required'),
        firstDay: Yup.string().required('firstDay is required'),
        lastDay: Yup.string().required('lastDay is required'),
      }),
    ),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          setTimeout(() => {
            handleSubmit(values);
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, errors, touched, handleReset, setFieldValue }) => (
          <Form>
            <FieldArray
              name="workExperience"
              render={({ remove, push }) => (
                <div>
                  {values.workExperience.length > 0 &&
                    values.workExperience.map((work, index) => (
                      <Work key={index}>
                        <div>
                          <div>
                            <Field
                              name={`workExperience.${index}.firstDay`}
                              placeholder="first Day"
                              readOnly={values.workExperience[index].edit}
                              type="date"
                              value={null || workExperience[index]?.firstDay}
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'workExperience',
                              nameField: 'firstDay',
                            })}
                          </div>
                          <div>
                            <Field
                              name={`workExperience.${index}.lastDay`}
                              placeholder="last Day"
                              readOnly={values.workExperience[index].edit}
                              type="date"
                              value={null || workExperience[index]?.lastDay}
                              max={new Date()}
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'workExperience',
                              nameField: 'lastDay',
                            })}
                          </div>
                        </div>
                        <div>
                          <div>
                            <Field
                              name={`workExperience.${index}.name`}
                              placeholder="name company"
                              readOnly={values.workExperience[index].edit}
                              type="text"
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'workExperience',
                              nameField: 'name',
                            })}
                          </div>
                          <div>
                            <Field
                              name={`workExperience.${index}.status`}
                              placeholder="status"
                              readOnly={values.workExperience[index].edit}
                              type="text"
                            />
                          </div>
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'workExperience',
                            nameField: 'status',
                          })}
                        </div>
                        <div>
                          <Field
                            type="checkbox"
                            name={`workExperience.${index}.edit`}
                            checked={!values.workExperience[index].edit}
                            onChange={() => {
                              setFieldValue(
                                `workExperience.${index}.edit`,
                                !values.workExperience[index].edit,
                              );
                            }}
                          />
                        </div>
                        <div>
                          <button type="button" className="secondary" onClick={() => remove(index)}>
                            X
                          </button>
                        </div>
                      </Work>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => {
                      push({ name: '', status: '', firstDay: '', lastDay: '', edit: '' });
                    }}
                  >
                    Add Work
                  </button>
                </div>
              )}
            />
            <br />
            <button
              onClick={(event) => {
                event.preventDefault();
                handleReset();
              }}
            >
              Reset
            </button>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
