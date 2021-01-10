import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { EducationType } from '../../services/api/api.types';
import moment from 'moment';
// import styled from 'styled-components';

// const Work = styled.div`
//   display: grid;
//   grid-template-columns: 3fr 7fr;
//   margin-left: 80px;
// `;

interface EducationFormProps {
  education: EducationType;
}

type EducationFormType = {
  name: string;
  speciality: string;
  degree: string;
  firstDay: string;
  lastDay: string;
};

export const EducationForm: FC<EducationFormProps> = ({ education }) => {
  const educations: EducationFormType[] = education.map((item, index) => {
    return {
      name: item.name,
      speciality: item.speciality,
      degree: item.degree,
      firstDay: moment(item.firstDay).format('MMM YYYY'),
      lastDay: moment(item.lastDay).format('MMM YYYY'),
    };
  });

  const initialValues = { educations };

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
              name="educations"
              render={({ remove, push }) => (
                <div>
                  {values.educations.length > 0 &&
                    values.educations.map((work, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <Field
                            name={`educations.${index}.firstDay`}
                            placeholder="first Day"
                            type="text"
                          />
                          <Field
                            name={`educations.${index}.name`}
                            placeholder="name "
                            type="text"
                          />
                        </div>
                        <div className="col">
                          <Field
                            name={`educations.${index}.lastDay`}
                            placeholder="last Day"
                            type="text"
                          />
                          <Field
                            name={`educations.${index}.speciality`}
                            placeholder="speciality"
                            type="text"
                          />
                        </div>
                        <div className="col">
                          <button type="button" className="secondary" onClick={() => remove(index)}>
                            X
                          </button>
                          <Field
                            name={`educations.${index}.degree`}
                            placeholder="degree"
                            type="text"
                          />
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      push({ name: '', speciality: '', degree: '', firstDay: '', lastDay: '' })
                    }
                  >
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
