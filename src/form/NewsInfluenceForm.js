import {Formik} from "formik";
import classes from "./form.module.scss";
import * as yup from "yup";
import DropDownSelect from "../component/form/DropdownSelect";
import {useQuery} from "react-query";
import {getAllNewsEvents} from "../service/newsInflluence/NewsInfluenceService";
import SubmitButton from "../component/form/SubmitButton";

const NewsInfluenceForm = ({onFormSubmit}) => {

    const {data, isLoading, isError} = useQuery('events', getAllNewsEvents);

    if(isLoading) {
        return null;
    }

    const validationSchema = yup.object(
        {
            event: yup.string().required()
        }
    )

    const initialValue = {
        event: undefined
    }

    const eventOptions = data.map((datum) => ({value: datum.event, label : datum.eventDescription}));

    const handleFormSubmit = (value) => {
        // Spread out the range object.
        const submitValues = {...value};

        onFormSubmit(submitValues);
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValue} onSubmit={handleFormSubmit}>
            {
                (formik) => {
                    return (
                        <div className={classes.horizontalForm}>

                            <DropDownSelect name={"event"} options={eventOptions} />

                            <SubmitButton formik={formik} />
                        </div>
                    )
                }
            }
        </Formik>
    )
}

export default NewsInfluenceForm;