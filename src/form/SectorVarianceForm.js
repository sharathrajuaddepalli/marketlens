import {Formik} from "formik";
import classes from "./form.module.scss";
import * as yup from "yup";
import {useContext} from "react";
import {StaticDataContext} from "../context/StaticDataContext";
import DropDownMultiSelect from "../component/form/DropdownMultiselect";
import RangeSlider from "../component/form/RangeSlider";
import DropDownSelect from "../component/form/DropdownSelect";
import SubmitButton from "../component/form/SubmitButton";

const SectorVarianceForm = ({onFormSubmit}) => {

    const {sectors, stockIndices} = useContext(StaticDataContext);

    const validationSchema = yup.object(
        {
            sectors: yup.array(
                yup.string().required()
            ).min(1).max(4).required(),
            range: yup.object(
                {
                    minYear: yup.number().required(),
                    maxYear: yup.number().required()
                }
            ),
            aggBy: yup.string().required()
        }
    );

    const initialValue = {
        sectors: [],
        range: {
            minYear: 2016,
            maxYear: 2021
        },
        aggBy: 'MONTH'
    }

    const sectorOptions = [...stockIndices,  "CRYPTO_CURRENCY"].map((sector) => ({label: sector, value: sector}));;

    const aggBys = [
        {
            label: "Month",
            value: "MONTH"
        },
        {
            label: "Year",
            value: "YEAR2"
        },
        {
            label: "Quarter",
            value: "QUARTER"
        }
    ]

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

                            <DropDownMultiSelect name={"sectors"}
                                                 placeholder={"Indices / Crypto"}
                                                 options={sectorOptions}
                            />

                            <DropDownSelect name={"aggBy"} options={aggBys} />

                            <RangeSlider name={"range"} minYear={2016} maxYear={2022} />

                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default SectorVarianceForm;