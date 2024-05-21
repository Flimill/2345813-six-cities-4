import { useSelector } from 'react-redux';
import ReiewForm from './review-form';
import ReviewsList from './reviews-list';
import { RootState } from '../../store';

function ReviewSection(): JSX.Element{
  const { isLoading, reviews, authorizationStatus} = useSelector((state: RootState) => ({
    isLoading: state.isLoading,
    reviews: state.reviews,
    authorizationStatus: state.authorizationStatus,
  }));
  if (isLoading) {
    return <span>Uploading reviews. Please wait.</span>;
  }

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {<ReviewsList reviews={reviews}/>}

      {(authorizationStatus) ? <ReiewForm/> : ''}
    </section>
  );
}
export default ReviewSection;
