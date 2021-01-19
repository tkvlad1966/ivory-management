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
}

type SkillsFormType = {
  name: string;
};

const SkillsForm: FC<SkillFormProps> = ({ profile }) => {
  const skill: SkillsFormType[] = profile?.skills.map((item, index) => {
    return { name: item.name, edit: true };
  });
  const initialValues = { skill };
  const educationValidation = Yup.object().shape({
    skill: Yup.array().of(
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
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        validationSchema={educationValidation}
      >
        {({ values, errors, touched, handleReset }) => {
          return (
            <Form>
              <FieldArray
                name="skill"
                render={({ remove, push }) => (
                  <div>
                    {values.skill.length > 0 &&
                      values.skill.map((skill, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <Field name={`skill.${index}.name`} placeholder="name " type="text" />
                          </div>

                          {errors &&
                          errors.skill &&
                          errors.skill[index] &&
                          // @ts-ignore
                          errors.skill[index].name ? (
                            // @ts-ignore
                            <div> {errors.skill[index].name} </div>
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
