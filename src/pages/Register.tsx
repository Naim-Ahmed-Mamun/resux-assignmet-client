/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Navbar from "../layout/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorMsg from "../components/common/error-msg";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [registerUser] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await registerUser(data);
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return toast.error(errorData.message);
        }
      }
    } else {
      toast.success("Register success");
      reset();
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-control"
                  id="name"
                />
                {errors.name && <ErrorMsg msg="This field is required" />}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                />
                {errors.email && <ErrorMsg msg="This field is required" />}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                {errors.password && <ErrorMsg msg="This field is required" />}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
