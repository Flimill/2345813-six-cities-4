type ImageListProps = {
    images: string[];
  }

function ImageList({ images }: ImageListProps): JSX.Element {
  return (
    <div className="offer__gallery">
      {images.map((image) => (
        <div className="offer__image-wrapper" key={image}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}

export default ImageList;
