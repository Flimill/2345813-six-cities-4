import { Reviews } from '../../types/types';
import ReviewsItem from './reviews-item';

type ReviewsListProps = {
    reviewsCount:number;
    reviews: Reviews;
}

function ReviewsList({reviewsCount, reviews}: ReviewsListProps): JSX.Element{
  const rewiewsComponent: JSX.Element[] = [];
  for (let i = 0; i < reviewsCount && i < reviews.length; i++) {
    rewiewsComponent.push(<ReviewsItem review={reviews[i]}/>);
  }
  return(
    <ul className="reviews__list">
      {rewiewsComponent}
    </ul>
  );
}
export default ReviewsList;
