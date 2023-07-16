import ErrorMsg from "../common/error-msg";
import { useGetBooksQuery } from "../../redux/features/products/productApi";
import { BookItem } from "./book-items";

const AllBookItems = () => {
  const { data: bookItems, isError, isLoading } = useGetBooksQuery();

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
                <h3>All Books</h3>
              </div>
            </div>
          </div>
          {content}
        </div>
      </section>
    </>
  );
};

export default AllBookItems;
