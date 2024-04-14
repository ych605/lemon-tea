import { MapStringCoordinate } from "./map";

export namespace API {
  export namespace SubmitRouting {
    export interface RequestBody {
      origin: string;
      destination: string;
    }

    export interface Response {
      token: string;
    }
  }

  export namespace GetRoute {
    export enum ResponseStatus {
      SUCCESS = "success",
      IN_PROGRESS = "in progress",
      FAILURE = "failure",
    }

    export interface SuccessResponse {
      status: ResponseStatus.SUCCESS;
      path: MapStringCoordinate[];
      total_distance: number;
      total_time: number;
    }

    interface InProgressResponse {
      status: ResponseStatus.IN_PROGRESS;
    }

    interface FailureResponse {
      status: ResponseStatus.FAILURE;
      error: string;
    }

    export type Response = SuccessResponse | InProgressResponse | FailureResponse;
  }
}
