/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  usePostReviewMutation,
  useSingleBookQuery,
} from "../redux/features/products/productApi";
import ErrorMsg from "../components/common/error-msg";
import { useAppSelector } from "../redux/hook";
import Navbar from "../layout/Navbar";
import { toast } from "react-toastify";

export default function BookDetails() {
  const { user } = useAppSelector((state) => state.user);
  const [review, setReview] = useState<string>("");
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: bookData,
    isError,
    isLoading,
  } = useSingleBookQuery(id as string);

  const [postReview, { data }] = usePostReviewMutation();
  const [deleteBook] = useDeleteBookMutation();

  // handle edit
  const handleEditBook = (email: string, id: string) => {
    if (email !== user?.email) {
      toast.error("You are not author this book");
    } else {
      navigate(`/edit-book/${id}`);
    }
  };

  // handle delete book
  const handleDeleteBook = async (email: string, id: string) => {
    const isDelete = window.confirm("are you sure delete this book ?");
    if (isDelete) {
      if (email !== user?.email) {
        toast.error("You are not author this book");
      } else {
        const res = await deleteBook(id);
        if ("error" in res) {
          if ("data" in res.error) {
            const errorData = res.error.data as { message?: string };
            if (typeof errorData.message === "string") {
              return toast.error(errorData.message);
            }
          }
        } else {
          toast.success("Book delete successfully");
          navigate(`/`);
        }
      }
    }
  };

  // handleSubmit from
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id) {
      await postReview({ id, data: { review } });
      setReview("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
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
      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{bookItem.title}</h5>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Author: {bookItem.author}</li>
              <li className="list-group-item">genre: {bookItem.genre}</li>
              <li className="list-group-item">
                publication Date: {bookItem.publicationDate}
              </li>
            </ul>
            {user?.email && (
              <div className="card-body">
                <button
                  onClick={() =>
                    handleEditBook(bookItem.createdBy, bookItem._id)
                  }
                  className="btn btn-primary mx-2"
                >
                  Edit Book
                </button>
                <button
                  onClick={() =>
                    handleDeleteBook(bookItem.createdBy, bookItem._id)
                  }
                  className="btn btn-danger"
                >
                  Delete Book
                </button>
              </div>
            )}
          </div>
        </div>
        {user?.email && (
          <div className="col-lg-6">
            <div className="mb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Review
                  </label>
                  <input
                    onChange={handleChange}
                    value={review}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            {bookItem.reviews && bookItem.reviews.length > 0 && (
              <div className="card">
                <ul className="list-group list-group-flush">
                  {bookItem.reviews.map((r, i) => (
                    <li key={i} className="list-group-item">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">{content}</div>
    </>
  );
}
