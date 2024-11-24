import { AppDispatch, RootState } from "@/redux";
import { addReview } from "@/redux/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SuccessAlert from "../alerts/SuccessAlert";
import ErrorAlert from "../alerts/ErrorAlert";
import { FaCircleUser } from "react-icons/fa6";
import { getAllProductsData } from "@/redux/slices/productSlice";

type CustomerReviewsProps = {
  productData: any;
};

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productData }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isShowSuccessAlert, setIsShowSuccessAlert] = useState({
    show: false,
    message: "",
  });

  const [isShowErrorAlert, setIsShowErrorAlert] = useState<{
    show: boolean;
    message: string | null;
  }>({
    show: false,
    message: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const [reviewInput, setReviewInput] = useState({
    productId: productData._id,
    email: auth?.userData?.message?.email,
    comment: "",
    rating: 4,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewInput({ ...reviewInput, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReviewInput({ ...reviewInput, rating: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Dispatch the verify Email action and unwrap the result
      await dispatch(addReview(reviewInput)).unwrap();
      // On success, show success message
      setIsShowSuccessAlert({
        show: true,
        message: "Comment Added.",
      });
      setReviewInput({
        productId: productData._id,
        email: auth?.userData?.message?.email,
        comment: "",
        rating: 4,
      }); // Reset input fields but retain productId
    } catch (error: unknown) {
      // Handle error in case of failure
      console.log(error);
      setIsShowErrorAlert({
        show: true,
        message: "Something went wrong.", // This will be the error string from rejectWithValue
      });
      // Check if the error is a string (rejectWithValue string) or an error object
      if (typeof error === "string") {
        setIsShowErrorAlert({
          show: true,
          message: error, // This will be the error string from rejectWithValue
        });
      } else if (error instanceof Error) {
        // If it's an instance of Error, use the message property
        console.log(error);
      } else {
        setIsShowErrorAlert({
          show: true,
          message: "An unexpected error occurred.", // This will be the error string from rejectWithValue
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getAllProductsData());
  }, [isShowSuccessAlert]);

  const [ratingPercentages, setRatingPercentages] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    // Calculate percentages when productData changes
    if (productData && productData.reviews) {
      const totalReviews = productData.reviews.length;
      const ratingsCount = [0, 0, 0, 0, 0]; // Index 0 => 5 stars, Index 1 => 4 stars, etc.

      // Count reviews for each rating
      productData.reviews.forEach((review: any) => {
        const ratingIndex = 4 - review.rating; // Map 5-star => index 0, 4-star => index 1, etc.
        ratingsCount[ratingIndex] += 1;
      });

      // Calculate percentages
      const percentages = ratingsCount.map((count) =>
        totalReviews > 0 ? (count / totalReviews) * 100 : 0
      );

      setRatingPercentages(percentages);
    }
  }, [productData]);

  return (
    <div className="bg-white p-6 rounded-lg mt-12">
      {/* Header Section */}
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Rating Breakdown */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-lg">★★★★☆</span>
            <span className="ml-2 text-gray-700 text-sm">
              Based on {productData.reviews.length} reviews
            </span>
          </div>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((star, index) => (
              <div key={star} className="flex items-center">
                <span className="text-sm font-medium w-4">{star}</span>
                <span className="ml-2 text-gray-500 text-sm">★</span>
                <div className="w-full h-3 bg-gray-200 rounded-full mx-2">
                  <div
                    className="h-3 bg-yellow-500 rounded-full"
                    style={{ width: `${ratingPercentages[index]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {ratingPercentages[index].toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          {/* Write a Review Button */}
          <div className="mt-6">
            <h3 className="font-medium text-gray-700">Share your thoughts</h3>
            <p className="text-sm text-gray-500">
              If you've used this product, share your thoughts with other
              customers.
            </p>
            {auth.isLoggedIn ? (
              <>
                {/* Write a Review Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-700">
                    Share your thoughts
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    If you've used this product, share your thoughts with other
                    customers.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                      name="comment"
                      value={reviewInput.comment}
                      onChange={handleInputChange}
                      placeholder="Write your review"
                      className="w-full p-2 border rounded-lg bg-secondary/10 focus:outline-primary max-h-[10rem] min-h-[5rem]"
                      rows={4}
                      minLength={3}
                      maxLength={100}
                      required
                    ></textarea>
                    <select
                      name="rating"
                      value={reviewInput.rating}
                      onChange={handleRatingChange}
                      className="w-full p-2 border rounded-lg"
                    >
                      {[4, 3, 2, 1].map((star) => (
                        <option key={star} value={star}>
                          {star} Star{star > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <button className="mt-3 px-4 py-2 bg-primary/80 border border-gray-300 rounded-lg text-white hover:bg-primary">
                      Write a review
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="flex-1 space-y-6">
          {productData?.reviews?.map((review: any, index: number) => (
            <div key={index} className="flex gap-4">
              <FaCircleUser size={25} />
              <div>
                <h4 className="font-medium text-gray-900">{review.email}</h4>
                <div className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}
                </div>
                <p className="text-gray-700 mt-2 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success and Error Alerts  */}
      <SuccessAlert
        isShowSuccessAlert={isShowSuccessAlert}
        setIsShowSuccessAlert={setIsShowSuccessAlert}
      />
      <ErrorAlert
        isShowErrorAlert={isShowErrorAlert}
        setIsShowErrorAlert={setIsShowErrorAlert}
      />
    </div>
  );
};

export default CustomerReviews;
