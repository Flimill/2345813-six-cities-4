import { useSelector } from 'react-redux';
import ReiewForm from './review-form';
import ReviewsList from './reviews-list';
import { RootState } from '../../store';
type ReviewSectionProps = {
  offerId: string;
}

function ReviewSection({offerId}: ReviewSectionProps): JSX.Element{
  const { reviews, authorizationStatus} = useSelector((state: RootState) => ({
    reviews: state.reviews,
    authorizationStatus: state.authorizationStatus,
  }));


  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      {<ReviewsList reviews={reviews}/>}

      {(authorizationStatus) ? <ReiewForm offerId={offerId}/> : ''}
    </section>
  );
}
export default ReviewSection;
