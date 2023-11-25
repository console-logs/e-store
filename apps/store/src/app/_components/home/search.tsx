"use client";
import { ERROR_MSG } from "@/lib/constants";
import { COMPONENT_RESULTS_PAGE } from "@/lib/routes";
import { Icons } from "@shared/components/Icons";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import * as Yup from "yup";

export default function SearchComponentInput() {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const initialValues = {
    query: "",
  };

  const validationSchema = Yup.object().shape({
    query: Yup.string().required(ERROR_MSG.COMPONENT_SEARCH_QUERY_REQUIRED),
  });

  async function handleOnSubmit(values: { query: string }) {
    startTransition(() => {
      router.push(
        COMPONENT_RESULTS_PAGE + encodeURI(values.query.toUpperCase()),
      );
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({}) => (
        <Form className="flex flex-1">
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex justify-center space-x-2 px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full lg:w-2/5">
                <Label className="sr-only">Search</Label>
                <Field
                  as={Input}
                  autoComplete="off"
                  name="query"
                  className="w-full"
                  placeholder="Search components by part number, keywords or tech specs"
                  type="text"
                  formNoValidate
                  required
                />
              </div>
              <Button disabled={isLoading} className="hidden w-24 md:flex">
                {isLoading ? (
                  <Icons.spinner
                    className="animate-spin text-center"
                    aria-hidden="true"
                  />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
