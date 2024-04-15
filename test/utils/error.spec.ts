import { describe, expect, it } from "vitest";
import { defaultErrorPlaceholder, renderError } from "../../src/utils/error";
import { AxiosError } from "axios";

describe("renderError", () => {
  it("can render axios error with default error placeholder properly", () => {
    const errorMessage = "errorMessage";
    const error = new AxiosError(errorMessage);
    const renderedErrorMessage = renderError(error);

    expect(renderedErrorMessage).toBe(`${defaultErrorPlaceholder} (Error: ${error.message})`);
  });

  it("can render axios error with error placeholder properly", () => {
    const errorMessage = "errorMessage";
    const error = new AxiosError(errorMessage);
    const errorPlaceholder = "errorPlaceholder";
    const renderedErrorMessage = renderError(error, errorPlaceholder);

    expect(renderedErrorMessage).toBe(`${errorPlaceholder} (Error: ${error.message})`);
  });

  it("can render error properly", () => {
    const errorMessage = "errorMessage";
    const error = new Error(errorMessage);
    const renderedErrorMessage = renderError(error);

    expect(renderedErrorMessage).toBe(error.message);
  });

  it("can render message-less error with default error placeholder properly", () => {
    const error = new Error();
    const renderedErrorMessage = renderError(error);

    expect(renderedErrorMessage).toBe(defaultErrorPlaceholder);
  });

  it("can render message-less error with error placeholder properly", () => {
    const error = new Error();
    const errorPlaceholder = "errorPlaceholder";
    const renderedErrorMessage = renderError(error, errorPlaceholder);

    expect(renderedErrorMessage).toBe(errorPlaceholder);
  });

  it("can render undefined error with default error placeholder properly", () => {
    const renderedErrorMessage = renderError();

    expect(renderedErrorMessage).toBe(defaultErrorPlaceholder);
  });

  it("can render undefined error with error placeholder properly", () => {
    const errorPlaceholder = "errorPlaceholder";
    const renderedErrorMessage = renderError(undefined, errorPlaceholder);

    expect(renderedErrorMessage).toBe(errorPlaceholder);
  });
});
