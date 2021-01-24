import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { ProfileType } from '../../services/api/api.types';
import * as Yup from 'yup';
// import styled from 'styled-components';

// const Work = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 7fr;
//   margin-left: 80px;
// `;

interface SkillFormProps {
  profile: ProfileType;
  handleSubmit: (values) => void;
}

type SkillsFormType = {
  name: string;
};

const SkillsForm: FC<SkillFormProps> = ({ profile, handleSubmit }) => {
  const skills: SkillsFormType[] = profile?.skills.map((item, index) => {
    return { name: item.name, edit: true };
  });
  const initialValues = { skills };
  const skillValidation = Yup.object().shape({
    skills: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Please enter a skill'),
      }),
    ),
    // .min(1, 'Need at least a skill'),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          handleSubmit(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        validationSchema={skillValidation}
      >
        {({ values, errors, touched, handleReset }) => {
          return (
            <Form>
              <FieldArray
                name="skills"
                render={({ remove, push }) => (
                  <div>
                    {values.skills.length > 0 &&
                      values.skills.map((skills, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <Field name={`skills.${index}.name`} placeholder="name " type="text" />
                          </div>

                          {errors &&
                          errors.skills &&
                          errors.skills[index] &&
                          // @ts-ignore
                          errors.skills[index].name ? (
                            // @ts-ignore
                            <div> {errors.skills[index].name} </div>
                          ) : null}
                          <div className="col"></div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    <button type="button" className="secondary" onClick={() => push({ name: '' })}>
                      +
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
          );
        }}
      </Formik>
    </div>
  );
};

export default SkillsForm;
