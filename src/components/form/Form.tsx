import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../../validators/userValidator.ts";
import {login} from "../../services/api.services.ts";
import {useNavigate} from "react-router";


interface IFormProps {
    username: string,
    password: string,
}

export const Form = () => {


    const {handleSubmit, register, formState: {errors, isValid}}
        = useForm<IFormProps>({mode: 'all', resolver: joiResolver(userValidator)});



    const navigate = useNavigate();
    const customHandler = async (formDataProps: IFormProps) => {
        try {
            const expiresInMins = 30;
            const response = await login({...formDataProps, expiresInMins});
            console.log("User logged in:", response);
            navigate('/')
        } catch (error) {
            console.error("Login failed:", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(customHandler)}>
                <label>
                    <input type="text" {...register('username')}/>
                    {errors.username && <div>{errors.username.message}</div>}
                </label>

                <label>
                    <input type="text" {...register('password')}/>
                    {errors.password && <div>{errors.password.message}</div>}
                </label>

                <button disabled={!isValid}>send</button>
            </form>
        </div>
    );
};
