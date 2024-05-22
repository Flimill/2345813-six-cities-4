import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Reviews } from '../../types/types';
import ReviewsItem from './reviews-item';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element{
  const isReviewLoading = useSelector((state: RootState) => (state.isReviewLoading));
  if (isReviewLoading) {
    return <span>Uploading reviews. Please wait.</span>;
  }
  const rewiewsComponent: JSX.Element[] = [];
  for (let i = 0; i < reviews.length; i++) {
    rewiewsComponent.push(<ReviewsItem key = {i} review={reviews[i]}/>);
  }
  return(
    <ul className="reviews__list">
      {rewiewsComponent}
    </ul>
  );
}
export default ReviewsList;
