import { useSelector } from 'react-redux';
import ReiewForm from './review-form';
import { RootState } from '../../store';
import MemoizedReviewsList from './reviews-list';
import { MAX_REVIEW_SIZE } from '../../const/const';
import ErrorMessage from '../error-message/error-message';
type ReviewSectionProps = {
  offerId: string;
}

function ReviewSection({offerId}: ReviewSectionProps): JSX.Element{
  const reviews = useSelector((state: RootState) => state.review.reviews);
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentReviews = sortedReviews.slice(0, MAX_REVIEW_SIZE);

  return(
    <section className="offer__reviews reviews">
      <ErrorMessage />
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {<MemoizedReviewsList reviews={recentReviews}/>}

      {(authorizationStatus) ? <ReiewForm offerId={offerId}/> : ''}
    </section>
  );
}
export default ReviewSection;
