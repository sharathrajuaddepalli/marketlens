import {Formik} from "formik";
import {useContext} from "react";
import {StaticDataContext} from "../context/StaticDataContext";
import classes from "./form.module.scss";
import * as yup from "yup";
import RangeSlider from "../component/form/RangeSlider";
import DropDownSelect from "../component/form/DropdownSelect";
import {VALID_TOP_N} from "../constant/constants"
import SubmitButton from "../component/form/SubmitButton";

const ContributionForm = ({onFormSubmit}) => {

    const {sectors} = useContext(StaticDataContext);

    const entriesOption = sectors.map(
        (entry) => {
            return {label: entry, value: entry}
        }
    )

    const validationSchema = yup.object(
        {
            range: yup.object({
                minYear: yup.number().required(),
                maxYear: yup.number().required(),
            }),
            sector: yup.string().required(),
            n: yup.number().oneOf(VALID_TOP_N).required()
        }
    )

    // console.log(entries);

    const initialValue = {
        range: {
            minYear: 2016,
            maxYear: 2021,
        },
        sectors: "",
        n: 5
    }

    const top_n_options = VALID_TOP_N.map((n) => ({label: n, value: n}));

    const handleFormSubmit = (value) => {
        // Spread out the range object.
        const submitValues = {...value, ...value.range};

        // submitValues.symbol = submitValues.symbol.map(v => v.value);

        onFormSubmit(submitValues);
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={handleFormSubmit}>
            {
                (formik) => {
                    return (
                        <div className={classes.horizontalForm}>
                            {/*<FEMultiElementSelect options={entriesOption} name={"symbol"}/>*/}

                            {/*<RadioGroup*/}
                            {/*    name={'aggBy'}*/}
                            {/*    options={[*/}
                            {/*        {label: 'Month', value: 'MONTH'},*/}
                            {/*        {label: 'Quarter', value: 'QUARTER'},*/}
                            {/*    ]}*/}
                            {/*/>*/}
                            <DropDownSelect name={"sector"} options={entriesOption} />
                            <DropDownSelect name={"n"} options={top_n_options} />
                            <RangeSlider minYear={2015} maxYear={2022} name={"range"} />

                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default ContributionForm;