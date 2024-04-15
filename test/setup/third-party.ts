import { afterAll, beforeAll, vi } from "vitest";

beforeAll(() => {
  vi.mock("@react-google-maps/api", () => ({
    useLoadScript: () => ({
      isLoaded: true,
      loadError: null,
      url: "",
    }),
  }));

  vi.mock("react-google-autocomplete/lib/usePlacesAutocompleteService", () => ({
    default: () => ({
      placePredictions: [],
      getPlacePredictions: () => {},
    }),
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});
