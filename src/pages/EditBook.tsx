/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Navbar from "../layout/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorMsg from "../components/common/error-msg";
import { toast } from "react-toastify";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../redux/features/products/productApi";
import { useAppSelector } from "../redux/hook";
import { useParams } from "react-router-dom";

type Inputs = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
};

const EditBookPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const {
    data: bookData,
    isError,
    isLoading,
  } = useSingleBookQuery(id as string);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [editBook] = useEditBookMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (user?.email && id) {
      const res = await editBook({id:id, data:{...data,createdBy:user.email} });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return toast.error(errorData.message);
          }
        }
      } else {
        toast.success("Book Edit success");
        reset();
      }
    } else {
      toast.error("Please login first");
    }
  };

  let content;
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && bookData) {
    const bookItem = bookData.data;
    content = (
      <div className="container mt-5 pt-5">
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
                  defaultValue={bookItem.title}
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
                  defaultValue={bookItem.author}
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
                  defaultValue={bookItem.genre}
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
                  defaultValue={bookItem.publicationDate}
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
    );
  }

  return (
    <>
      <Navbar />

      <section className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="py-4 text-center">
                <h3>Edit Book</h3>
              </div>
            </div>
          </div>
          {content}
        </div>
      </section>
    </>
  );
};

export default EditBookPage;
