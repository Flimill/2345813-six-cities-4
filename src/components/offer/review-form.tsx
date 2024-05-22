import { useState } from 'react';
import { sendReviewData } from '../../store/api-actions';
import { RootState, store } from '../../store';
import { useSelector } from 'react-redux';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const error = useSelector((state: RootState) => (state.error));

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };
  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    store.dispatch(sendReviewData({offerId: offerId,comment: review, rating: rating}));
  };

  const ratingArr = [5,4,3,2,1];
  const textErrorStyle = (error === 'VALIDATION_ERROR') ? { color: 'red' } : { };
  return (
    <form className="reviews__form form" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingArr.map((rat)=>(
          <>
            <input className="form__rating-input visually-hidden" name="rating" value={rat} id={`${rat}-stars`} key={`input ${rat}`} type="radio" onChange={handleRatingChange} />
            <label htmlFor={`${rat}-stars`} className="reviews__rating-label form__rating-label" title="perfect" key={`label ${rat}`}>
              <svg className="form__star-image" width="37" height="33" key={`svg ${rat}`}>
                <use xlinkHref="#icon-star" key={`use ${rat}`}></use>
              </svg>
            </label>
          </>
        ))}

      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleReviewChange}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help" style={textErrorStyle}>
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={undefined}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
