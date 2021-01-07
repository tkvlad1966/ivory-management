import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { WorkExperienceType } from '../../services/api/api.types';
import { Month } from '../../utils/constants';

interface WorksFormProps {
  workExperience: WorkExperienceType;
}

type WorkType = {
  name: string;
  status: string;
  firstDay: string;
  lastDay: string;
};

export const WorksForm: FC<WorksFormProps> = (props) => {
  const { workExperience } = props;
  const works: WorkType[] = workExperience.map((item, index) => {
    const firstDayDate = new Date(Date.parse(item.firstDay));
    const lastDayDate = new Date(Date.parse(item.lastDay));

    return {
      name: item.name,
      status: item.status,
      firstDay: `${Month[firstDayDate.getMonth()].slice(0, 3)} ${firstDayDate.getFullYear()}`,
      lastDay: `${Month[lastDayDate.getMonth()].slice(0, 3)} ${lastDayDate.getFullYear()}`,
    };
  });

  const initialValues = { works };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validate={() => ({ foo: true })}
        onSubmit={(values) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 500);
        }}
        render={({ values, errors, touched, handleReset }) => (
          //   console.group('formik');
          // console.log('touched', touched);
          //   console.log('values', values);
          //   console.groupEnd();
          <Form>
            <FieldArray
              name="works"
              render={({ remove, push }) => (
                <div>
                  {values.works.length > 0 &&
                    values.works.map((work, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          {/* <label htmlFor={`works.${index}.name`}>Name</label> */}
                          <Field
                            name={`works.${index}.firstDay`}
                            placeholder="first Day"
                            type="text"
                          />
                          {/* {
                            errors.works &&
                              errors.works[index] &&
                              errors.friends[index].name &&
                              touched.works &&
                              touched.works[index].firstDay
                            && (
                              <div className="field-error">{errors.friends[index].name}</div>
                            )
                          } */}
                          <Field
                            name={`works.${index}.name`}
                            placeholder="name company"
                            type="text"
                          />
                          {/* {
                            errors.works &&
                              errors.works[index] &&
                              errors.friends[index].name &&
                              touched.works &&
                              touched.works[index].name
                            && (
                              <div className="field-error">{errors.friends[index].name}</div>
                            )
                          } */}
                        </div>
                        <div className="col">
                          {/* <label htmlFor={`works.${index}.status`}>Name</label> */}
                          <Field
                            name={`works.${index}.lastDay`}
                            placeholder="last Day"
                            type="text"
                          />
                          {/* {
                            errors.works &&
                              errors.works[index] &&
                              errors.works[index].lastDay &&
                              touched.works &&
                              touched.works[index].lastDay
                            && (
                              <div className="field-error">{errors.friends[index].name}</div>
                            )
                          } */}
                          <Field name={`works.${index}.status`} placeholder="status" type="text" />
                          {/* {
                            errors.works &&
                              errors.works[index] &&
                              errors.friends[index].name &&
                              touched.works &&
                              touched.works[index].status
                            && (
                              <div className="field-error">{errors.works[index].name}</div>
                            )
                          } */}
                        </div>

                        <div className="col">
                          <button type="button" className="secondary" onClick={() => remove(index)}>
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({ name: '', status: '' })}
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
      />
    </div>
  );
};
