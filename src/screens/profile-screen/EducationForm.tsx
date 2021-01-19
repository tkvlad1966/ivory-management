import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { ProfileType } from '../../services/api/api.types';
import moment from 'moment';
import styled from 'styled-components';
import * as Yup from 'yup';
import { IsErrorField } from '../../utils/functions';

const Container = styled.div`
  /* display: grid;
  grid-template-columns: 12fr; */
`;

const Data = styled.div`
  display: grid;
  grid-template-columns: 10fr;
`;

const ContainerButtons = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
`;

const Work = styled.div`
  display: grid;
  grid-template-columns: 3fr 6fr 1fr;
  margin: 50px 100px 0 100px;
`;

interface EducationFormProps {
  profile: ProfileType;
}

type EducationFormType = {
  name: string;
  speciality: string;
  degree: string;
  firstDay: string;
  lastDay: string;
  edit: boolean;
};

export const EducationForm: FC<EducationFormProps> = ({ profile }) => {
  const educationsForm: EducationFormType[] = profile?.education.map((item, index) => {
    return {
      name: item.name,
      speciality: item.speciality,
      degree: item.degree,
      firstDay: moment(item.firstDay).format('YYYY-MM-DD'),
      lastDay: moment(item.lastDay).format('YYYY-MM-DD'),
      edit: true,
    };
  });

  const initialValues = { educationsForm };

  const validateSchema = Yup.object().shape({
    educations: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        speciality: Yup.string().required('Status is required'),
        degree: Yup.string().required('Degree is required'),
        firstDay: Yup.string().required('firstDay is required'),
        lastDay: Yup.string().required('lastDay is required'),
      }),
    ),
  });

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, errors, touched, handleReset, setFieldValue }) => (
          <Form>
            <FieldArray
              name="educations"
              render={({ remove, push }) => (
                <Data>
                  {values.educationsForm.length > 0 &&
                    values.educationsForm.map((work, index) => (
                      <Work className="row" key={index}>
                        <div>
                          <Field
                            name={`educationsForm.${index}.firstDay`}
                            placeholder="first Day"
                            readOnly={values.educationsForm[index].edit}
                            type="date"
                            value={null || educationsForm[index]?.firstDay}
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'educationsForm',
                            nameField: 'firstDay',
                          })}
                          <Field
                            name={`educationsForm.${index}.lastDay`}
                            placeholder="last Day"
                            readOnly={values.educationsForm[index].edit}
                            type="date"
                            value={null || educationsForm[index]?.lastDay}
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'educationsForm',
                            nameField: 'lastDay',
                          })}
                        </div>
                        <div>
                          <div>
                            <Field
                              name={`educationsForm.${index}.name`}
                              placeholder="name "
                              readOnly={values.educationsForm[index].edit}
                              type="text"
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'educationsForm',
                              nameField: 'name',
                            })}
                          </div>
                          <div>
                            <Field
                              name={`educationsForm.${index}.speciality`}
                              placeholder="speciality"
                              readOnly={values.educationsForm[index].edit}
                              type="text"
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'educationsForm',
                              nameField: 'speciality',
                            })}
                          </div>
                          <Field
                            name={`educationsForm.${index}.degree`}
                            placeholder="degree"
                            readOnly={values.educationsForm[index].edit}
                            type="text"
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'educationsForm',
                            nameField: 'degree',
                          })}
                        </div>
                        <div className="col">
                          <Field
                            type="checkbox"
                            name={`educationsForm.${index}.edit`}
                            checked={!values.educationsForm[index].edit}
                            onChange={() => {
                              setFieldValue(
                                `educationsForm.${index}.edit`,
                                !values.educationsForm[index].edit,
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
                  <ContainerButtons>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() =>
                        push({ name: '', speciality: '', degree: '', firstDay: '', lastDay: '' })
                      }
                    >
                      Add education
                    </button>
                  </ContainerButtons>
                </Data>
              )}
            />

            <ContainerButtons>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleReset();
                }}
              >
                Reset
              </button>
              <button type="submit">Submit</button>
            </ContainerButtons>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
