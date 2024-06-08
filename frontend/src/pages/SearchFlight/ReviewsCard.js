
const ReviewsCard = ({reviews}) => {
return(
  <div className="bg-white absolute flex flex-wrap  pb-2 shadow-lg border-2 mt-64 md:mt-40  md:w-2/3 w-80 h-max pl-4 pr-4">
        {reviews && reviews.map((rev)=>{
            return<div>
                <span className="italic font-semibold w-full">{rev.comment}</span> by 
                trusted user</div>
        })}
        {reviews.length===0 && <div>No reviews yet</div>}
    </div>
  )
  
};

export default ReviewsCard;
