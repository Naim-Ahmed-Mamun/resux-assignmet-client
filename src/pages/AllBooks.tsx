import Navbar from '../layout/Navbar';
import AllBookItems from '../components/books/all-books';
import Footer from '../layout/Footer';

const AllBooks = () => {
  return (
    <>
      <Navbar/>

      <AllBookItems/>

      <Footer/>
    </>
  );
};

export default AllBooks;