import {useField} from "formik";
import classes from "../../form/form.module.scss";
import Multirangeslider from "multi-range-slider-react";

const RangeSlider = ({name, minYear, maxYear}) => {
    const [field, meta, helper] = useField(name);

    return (
        <Multirangeslider
            className={classes.formElement}
            min={minYear}
            max={maxYear}
            minValue={field.value.minYear}
            maxValue={field.value.maxYear}
            onInput={({minValue, maxValue}) => {
                helper.setValue({minYear:minValue, maxYear:maxValue})
                helper.setValue({minYear:minValue, maxYear:maxValue})
            }}
            step={1}
            style={{
                border: 'none',
                boxShadow: 'none'
            }}
            label={true}
            ruler={false}
            barInnerColor={'#007aff'}
        />
    )

}

export default RangeSlider;