import { afterAll, beforeAll } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import env from "./env";
import { API } from "../../src/types/api";
import { SubmitRoutingOrigin, SubmitRoutingToken } from "../types/api";

const restHandler = [
  http.get(`${env.API_ENDPOINT}route/:token`, ({ params }) => {
    const { token } = params;

    switch (token) {
      case SubmitRoutingToken.ProcessErrorToken:
        return new HttpResponse(null, { status: 500 });

      case SubmitRoutingToken.InProgressToken:
        return HttpResponse.json({ status: "in progress" });

      case SubmitRoutingToken.FailureToken:
        return HttpResponse.json({
          status: "failure",
          error: "Location not accessible by car",
        });

      case SubmitRoutingToken.SuccessToken:
      default:
        return HttpResponse.json({
          status: "success",
          path: [
            ["22.372081", "114.107877"],
            ["22.326442", "114.167811"],
            ["22.284419", "114.159510"],
          ],
          total_distance: 20000,
          total_time: 1800,
        });
    }
  }),

  http.post(`${env.API_ENDPOINT}route`, async ({ request }) => {
    const { origin } = ((await request.json()) || {}) as API.SubmitRouting.RequestBody;

    switch (origin) {
      case SubmitRoutingOrigin.ServerErrorOrigin:
        return new HttpResponse(null, { status: 500 });

      case SubmitRoutingOrigin.InProgressOrigin:
        return HttpResponse.json({
          token: SubmitRoutingToken.InProgressToken,
        });

      case SubmitRoutingOrigin.FailureOrigin:
        return HttpResponse.json({
          token: SubmitRoutingToken.FailureToken,
        });

      case SubmitRoutingOrigin.ProcessErrorOrigin:
        return HttpResponse.json({
          token: SubmitRoutingToken.ProcessErrorToken,
        });

      case SubmitRoutingOrigin.SuccessOrigin:
      default:
        return HttpResponse.json({
          token: SubmitRoutingToken.SuccessToken,
        });
    }
  }),
];

const server = setupServer(...restHandler);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterAll(() => server.close());
