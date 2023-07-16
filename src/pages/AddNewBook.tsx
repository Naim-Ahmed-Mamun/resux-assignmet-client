/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Navbar from "../layout/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorMsg from "../components/common/error-msg";
import { toast } from "react-toastify";
import { usePostBookMutation } from "../redux/features/products/productApi";
import { useAppSelector } from "../redux/hook";

type Inputs = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

const AddNewBookPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [postBook, { data }] = usePostBookMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (user?.email) {
      const res = await postBook({ ...data, createdBy: user.email });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return toast.error(errorData.message);
          }
        }
      } else {
        toast.success("Book Added success");
        reset();
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 pt-5">
        <div className="py-4 text-center">
          <h3>Add Book</h3>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Title
                </label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className="form-control"
                  id="name"
                />
                {errors.title && <ErrorMsg msg="This field is required" />}
              </div>

              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  {...register("author", { required: true })}
                  type="text"
                  className="form-control"
                  id="author"
                />
                {errors.author && <ErrorMsg msg="This field is required" />}
              </div>

              <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                  Genre
                </label>
                <input
                  {...register("genre", { required: true })}
                  type="text"
                  className="form-control"
                  id="genre"
                />
                {errors.genre && <ErrorMsg msg="This field is required" />}
              </div>

              <div className="mb-3">
                <label htmlFor="publicationDate" className="form-label">
                  publicationDate
                </label>
                <input
                  {...register("publicationDate", { required: true })}
                  type="text"
                  className="form-control"
                  id="publicationDate"
                />
                {errors.publicationDate && (
                  <ErrorMsg msg="This field is required" />
                )}
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

export default AddNewBookPage;
