import { useSelector } from 'react-redux';
import ReiewForm from './review-form';
import ReviewsList from './reviews-list';
import { RootState } from '../../store';

function ReviewSection(): JSX.Element{
  const { isLoading, reviews } = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    reviews: state.reviews,
  }));
  if (isLoading) {
    return <span>Uploading reviews. Please wait.</span>;
  }

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {<ReviewsList reviews={reviews}/>}

      {<ReiewForm/>}
    </section>
  );
}
export default ReviewSection;
