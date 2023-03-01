import classes from "./formComp.module.scss";
import {useField} from "formik";

const RadioGroup = ({name, options}) => {
    const [field, meta, helper] = useField(name);

    const handleClick = (e) => {
        helper.setValue(e.target.value);
    }

    return (
        <div className={classes.radioGroup}>
            <p className={classes.radioGroupLabel}>Temporal Granularity</p>
            <div className={classes.radioOutput}>
                {options.map(({label, value}) => <label htmlFor={value} className={classes.radioLabel} key={value}>
                    <input
                        checked={field.value === value}
                        type={'radio'}
                        name={name}
                        id={value}
                        value={value}
                        onChange={handleClick}
                /> {label}
                </label> )}
            </div>
        </div>
    );

}

export default RadioGroup;