import React, { useState } from 'react';
import { Formik, useFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const UrlShortener = () => {
  const [state, setState] = useState({ newUrl: '' });
  const validationSchema = yup.object().shape({
    url: yup.string().trim().url().required('Completa este campo'),
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>URL SHORTENER</h1>
            <Formik
              initialValues={{
                url: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                console.log(values.url);
                const obj = {
                  url: values.url,
                  alias: '',
                };
                const options = {
                  method: 'POST',
                  body: JSON.stringify(obj),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                };
                console.log(options);

                const url = 'http://localhost:4000/api/short-url/';
                let shortUrl = 'localhost:4000/api/short-url/';
                try {
                  const response = await fetch(url, options);

                  if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                  }

                  const data = await response.json();
                  setState({ newUrl: shortUrl + data.alias });
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {({
                isSubmitting,
                values,
                setFieldValue,
                handleChange,
                errors,
                touched,
                resetForm,
              }) => (
                <Form>
                  <div className="row mt-5">
                    <div className="form-group col-md-12 col-12">
                      <label className="col-form-label" htmlFor="">
                        Url
                      </label>
                      <input
                        className="form-control border-1 border-secondary"
                        name="url"
                        type="text"
                        value={values.url}
                        onChange={handleChange}
                      />
                      {errors.url && touched.url ? (
                        <span className="text-danger">{errors.url}</span>
                      ) : null}
                      <button className="mt-5 form-control btn">
                        Acortar{' '}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {state.newUrl !== '' && (
            <>
              <div className="mt-5 form-group col-md-6 offset-md-3">
                <h3>Nueva url :</h3>
                <strong>{state.newUrl}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default UrlShortener;
