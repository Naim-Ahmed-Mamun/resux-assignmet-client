import ErrorMsg from "../common/error-msg";
import { useGetBooksQuery, useGetRecentBooksQuery } from "../../redux/features/products/productApi";
import { Link } from "react-router-dom";
import { IBook } from "../../types/globalTypes";

// book item

export function BookItem({ item }: { item: IBook }) {
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Author: {item.author}</li>
          <li className="list-group-item">genre: {item.genre}</li>
          <li className="list-group-item">
            publication Date: {item.publicationDate}
          </li>
        </ul>
        <div className="card-body">
          <Link to={`/book-details/${item._id}`} className="btn btn-primary">
            Book Details
          </Link>
        </div>
      </div>
    </div>
  );
}

const BookItems = () => {
  const { data: bookItems, isError, isLoading } = useGetRecentBooksQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading...</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && bookItems?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && bookItems?.data) {
    const books_items = bookItems.data;

    content = (
      <>
        <div className="row">
          {books_items.map((item) => (
            <BookItem key={item._id} item={item} />
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <section className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="py-4 text-center">
                <h3>Recent Books</h3>
              </div>
            </div>
          </div>
          {content}
        </div>
      </section>
    </>
  );
};

export default BookItems;
