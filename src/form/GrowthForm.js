import {Formik, useFormik} from "formik";
import MultiSelect from "../component/form/MultiSelect";
import {Fragment, useContext} from "react";
import {StaticDataContext} from "../context/StaticDataContext";
import Multirangeslider from "multi-range-slider-react";
import classes from "./form.module.scss";
import RadioGroup from "../component/form/RadioGroup";
import * as yup from "yup";
import FEMultiElementSelect from "../component/form/MultiSelect";
import RangeSlider from "../component/form/RangeSlider";
import SubmitButton from "../component/form/SubmitButton";

const GrowthForm = ({onFormSubmit}) => {

    const staticData = useContext(StaticDataContext);

    var entries = Object.entries(staticData)
        .map(([key, value]) => value ? value.map((val) => `${key}:${val}`) : [])
        .flat();

    entries = [...entries, 'covid:COVID'];

    const entriesOption = entries.map(
        (entry) => {
            const [type, value] = entry.split(':');

            return {label: `${type} - ${value}`, value: entry}
        }
    )

    const validationSchema = yup.object(
        {
            range: yup.object({
                minYear: yup.number().required(),
                maxYear: yup.number().required(),
            }),
            aggBy: yup.string().required(),
            symbol: yup.array().min(1).required()
        }
    )

    // console.log(entries);

    const initialValue = {
        range: {
            minYear: 2016,
            maxYear: 2021,
        },
        aggBy: 'MONTH',
        symbol: []
    }

    const handleFormSubmit = (value) => {
        // Spread out the range object.
        const submitValues = {...value, ...value.range};

        submitValues.symbol = submitValues.symbol.map(v => v.value);

        onFormSubmit(submitValues);
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={handleFormSubmit}>
            {
                (formik) => {
                    return (
                        <div className={classes.horizontalForm}>
                            <FEMultiElementSelect options={entriesOption} name={"symbol"}/>
                            {/*<div className={classes.formElement}>*/}
                            {/*    <MultiSelect value={formik.values.symbol}*/}
                            {/*                 setValue={(newValues) => formik.setFieldValue("symbol", newValues)}*/}
                            {/*                 options={entriesOption}/>*/}
                            {/*</div>*/}

                            <RadioGroup
                                name={'aggBy'}
                                options={[
                                    {label: 'Month', value: 'MONTH'},
                                    {label: 'Quarter', value: 'QUARTER'},
                                ]}
                                />

                            <RangeSlider minYear={2015} maxYear={2022} name={"range"} />

                            {/*<Multirangeslider*/}
                            {/*    className={classes.formElement}*/}
                            {/*    min={2000}*/}
                            {/*    max={2022}*/}
                            {/*    minValue={formik.values.minValue}*/}
                            {/*    maxValue={formik.values.maxValue}*/}
                            {/*    onInput={({minValue, maxValue}) => {*/}
                            {/*        formik.setFieldValue('minYear', minValue)*/}
                            {/*        formik.setFieldValue('maxYear', maxValue)*/}
                            {/*    }}*/}
                            {/*    step={1}*/}
                            {/*    style={{*/}
                            {/*        border: 'none',*/}
                            {/*        boxShadow: 'none'*/}
                            {/*    }}*/}
                            {/*    label={true}*/}
                            {/*    ruler={false}*/}
                            {/*    barInnerColor={'lightblue'}*/}
                            {/*/>*/}

                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default GrowthForm;