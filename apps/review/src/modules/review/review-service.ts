import { CallContext, ServerError, Status } from "nice-grpc";
import {
  CreateReviewRequest,
  CreateReviewResponse,
  DeepPartial,
  GetReviewRequest,
  GetReviewResponse,
  GetReviewsRequest,
  GetReviewsResponse,
  ReviewServiceImplementation,
} from "protos/node/review/services/review_service";

export const reviewServiceImpl: ReviewServiceImplementation = {
  getReview: function (
    request: GetReviewRequest,
    context: CallContext,
  ): Promise<DeepPartial<GetReviewResponse>> {
    throw new ServerError(Status.UNIMPLEMENTED, "Not implemented");
  },
  getReviews: function (
    request: GetReviewsRequest,
    context: CallContext,
  ): Promise<DeepPartial<GetReviewsResponse>> {
    throw new ServerError(Status.UNIMPLEMENTED, "Not implemented");
  },
  createReview: function (
    request: CreateReviewRequest,
    context: CallContext,
  ): Promise<DeepPartial<CreateReviewResponse>> {
    throw new ServerError(Status.UNIMPLEMENTED, "Not implemented");
  },
};
