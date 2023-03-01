import classes from "../../form/form.module.scss";
import {useField} from "formik";
import Select from "react-select";

const MultiSelect = ({options, setValue, value}) => {

    return (
        <Select
            closeMenuOnSelect={true}
            defaultValue={[]}
            isMulti={false}
            options={options}
            onChange={setValue}
            value={value}
            isSearchable={false}
        />
    )
}

const DropDownSelect = ({name, options}) => {
    const [field, meta, helper] = useField(name);


    return (
        <div className={classes.formElement}>
            <MultiSelect value={field.value ? {label: options.filter((elem) => elem.value == field.value)[0].label, value: field.value} : field.value}
                         setValue={({value}) => helper.setValue(value)}
                         options={options}/>
        </div>
    );

}

export default DropDownSelect;