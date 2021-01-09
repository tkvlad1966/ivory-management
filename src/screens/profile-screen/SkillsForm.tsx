import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { SkillsType } from '../../services/api/api.types';
// import styled from 'styled-components';

// const Work = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 7fr;
//   margin-left: 80px;
// `;

interface SkillFormProps {
  skills: SkillsType;
}

type SkillsFormType = {
  name: string;
};

const SkillsForm: FC<SkillFormProps> = ({ skills }) => {
  const skill: SkillsFormType[] = skills.map((item, index) => {
    return { name: item.name };
  });

  const initialValues = { skill };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        render={({ values, errors, touched, handleReset }) => (
          <Form>
            <FieldArray
              name="skill"
              render={({ remove, push }) => (
                <div>
                  {values.skill.length > 0 &&
                    values.skill.map((work, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <Field name={`skill.${index}.name`} placeholder="name " type="text" />
                        </div>

                        <div className="col">
                          <button type="button" className="secondary" onClick={() => remove(index)}>
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
        )}
      />
    </div>
  );
};

export default SkillsForm;
