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
  handleSubmit: (values) => void;
}

type EducationFormType = {
  name: string;
  speciality: string;
  degree: string;
  firstDay: string;
  lastDay: string;
  edit: boolean;
};

export const EducationForm: FC<EducationFormProps> = ({ profile, handleSubmit }) => {
  const education: EducationFormType[] = profile?.education.map((item, index) => {
    return {
      name: item.name,
      speciality: item.speciality,
      degree: item.degree,
      firstDay: moment(item.firstDay).format('YYYY-MM-DD'),
      lastDay: moment(item.lastDay).format('YYYY-MM-DD'),
      edit: true,
    };
  });

  const initialValues = { education };

  const validateSchema = Yup.object().shape({
    education: Yup.array().of(
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
          handleSubmit(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ values, errors, touched, handleReset, setFieldValue }) => (
          <Form>
            <FieldArray
              name="education"
              render={({ remove, push }) => (
                <Data>
                  {values.education.length > 0 &&
                    values.education.map((work, index) => (
                      <Work className="row" key={index}>
                        <div>
                          <Field
                            name={`education.${index}.firstDay`}
                            placeholder="first Day"
                            readOnly={values.education[index].edit}
                            type="date"
                            value={null || education[index]?.firstDay}
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'education',
                            nameField: 'firstDay',
                          })}
                          <Field
                            name={`education.${index}.lastDay`}
                            placeholder="last Day"
                            readOnly={values.education[index].edit}
                            type="date"
                            value={null || education[index]?.lastDay}
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'education',
                            nameField: 'lastDay',
                          })}
                        </div>
                        <div>
                          <div>
                            <Field
                              name={`education.${index}.name`}
                              placeholder="name "
                              readOnly={values.education[index].edit}
                              type="text"
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'education',
                              nameField: 'name',
                            })}
                          </div>
                          <div>
                            <Field
                              name={`education.${index}.speciality`}
                              placeholder="speciality"
                              readOnly={values.education[index].edit}
                              type="text"
                            />
                            {IsErrorField({
                              errors,
                              touched,
                              index,
                              nameForm: 'education',
                              nameField: 'speciality',
                            })}
                          </div>
                          <Field
                            name={`education.${index}.degree`}
                            placeholder="degree"
                            readOnly={values.education[index].edit}
                            type="text"
                          />
                          {IsErrorField({
                            errors,
                            touched,
                            index,
                            nameForm: 'education',
                            nameField: 'degree',
                          })}
                        </div>
                        <div className="col">
                          <Field
                            type="checkbox"
                            name={`education.${index}.edit`}
                            checked={!values.education[index].edit}
                            onChange={() => {
                              setFieldValue(
                                `education.${index}.edit`,
                                !values.education[index].edit,
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
