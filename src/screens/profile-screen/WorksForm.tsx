import React, { FC } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import { WorkExperienceType } from '../../services/api/api.types';
import moment from 'moment';

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
    return {
      name: item.name,
      status: item.status,
      firstDay: moment(item.firstDay).format('MMM YYYY'),
      lastDay: moment(item.lastDay).format('MMM YYYY'),
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
          <Form>
            <FieldArray
              name="works"
              render={({ remove, push }) => (
                <div>
                  {values.works.length > 0 &&
                    values.works.map((work, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <Field
                            name={`works.${index}.firstDay`}
                            placeholder="first Day"
                            type="text"
                          />
                          {/* {errors.works &&
                            errors.works[index] &&
                            errors.works[index] &&
                            touched.works &&
                            touched.works[index].name && (
                              <div className="field-error">{errors.works[index]}</div>
                            )} */}
                          <Field
                            name={`works.${index}.name`}
                            placeholder="name company"
                            type="text"
                          />
                        </div>
                        <div className="col">
                          <Field
                            name={`works.${index}.lastDay`}
                            placeholder="last Day"
                            type="text"
                          />
                          <Field name={`works.${index}.status`} placeholder="status" type="text" />
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
                    onClick={() => push({ name: '', status: '', firstDay: '', lastDay: '' })}
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
