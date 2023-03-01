import {Formik} from "formik";
import classes from "./form.module.scss";
import * as yup from "yup";
import {useContext} from "react";
import {StaticDataContext} from "../context/StaticDataContext";
import DropDownMultiSelect from "../component/form/DropdownMultiselect";
import RangeSlider from "../component/form/RangeSlider";
import SubmitButton from "../component/form/SubmitButton";

const NewsInfluenceForm = ({onFormSubmit}) => {

    const {sectors, stockIndices, indicators} = useContext(StaticDataContext);

    const validationSchema = yup.object(
        {
            indicators: yup.array(
                yup.string().required()
            ).min(1).max(4).required(),
            sectors: yup.array(
                yup.string().required()
            ).min(1).max(4).required(),
            range: yup.object(
                {
                    minYear: yup.number().required(),
                    maxYear: yup.number().required()
                }
            )
        }
    );

    const initialValue = {
        indicators: [],
        sectors: [],
        range: {
            minYear: 2016,
            maxYear: 2021
        }
    }

    const sectorOptions = [...sectors, ...stockIndices].map((sector) => ({label: sector, value: sector}));
    const indicatorOptions = [...indicators].map((indicator) => ({label: indicator, value: indicator}));

    const handleFormSubmit = (value) => {
        // Spread out the range object.
        const submitValues = {...value, ...value.range};

        onFormSubmit(submitValues);
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={handleFormSubmit}>
            {
                (formik) => {
                    return (
                        <div className={classes.horizontalForm}>

                            <DropDownMultiSelect name={"indicators"}
                                                 placeholder={"Economic Indicators"}
                                                 options={indicatorOptions} />

                            <DropDownMultiSelect name={"sectors"}
                                                 placeholder={"Sector / Indices"}
                                                 options={sectorOptions}
                                                 />

                            <RangeSlider name={"range"} minYear={2016} maxYear={2022} />

                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default NewsInfluenceForm;