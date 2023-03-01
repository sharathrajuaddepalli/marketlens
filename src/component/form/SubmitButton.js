import classes from "../../form/form.module.scss";

const SubmitButton = ({formik}) => {
    return (
        <button
            className={classes.submitButton}
            disabled={!(formik.isValid && formik.dirty)}
            type={"submit"}
            onClick={formik.handleSubmit}>Submit</button>
    );
}

export default SubmitButton;