import { Reviews } from '../../types/types';
import ReiewForm from './review-form';
import ReviewsList from './reviews-list';

type ReviewSectionProps = {
    reviewsCount:number;
    reviews: Reviews;
}

function ReviewSection({reviewsCount, reviews}: ReviewSectionProps): JSX.Element{
  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
      {<ReviewsList reviewsCount={reviewsCount} reviews={reviews}/>}

      {<ReiewForm/>}
    </section>
  );
}
export default ReviewSection;
