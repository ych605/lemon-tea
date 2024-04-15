import React from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitRoutingOrigin } from "../types/api";
import MainPage from "../../src/pages/MainPage";

const queryClient = new QueryClient();

const renderPage = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>,
  );
};

describe("MainPage", () => {
  beforeEach(() => {
    renderPage();
  });

  afterEach(() => {});

  it("renders the MainPage component in InputStep", () => {
    const modalHeader = screen.getByText(/Welcome\, enjoy this lemon tea\!/i);
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    expect(modalHeader).toBeInTheDocument();
    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("can submit origin and destination in InputStep", async () => {
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    fireEvent.change(originInput, { target: { value: SubmitRoutingOrigin.SuccessOrigin } });
    fireEvent.change(destinationInput, { target: { value: "Destination" } });

    await userEvent.click(submitButton);

    expect(originInput).not.toBeInTheDocument();
    expect(destinationInput).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    const successLine = screen.getByText(/Process success\!/i);

    expect(successLine).toBeInTheDocument();

    const mapDetailsCardTitle = screen.getByText(/Route details/i);

    expect(mapDetailsCardTitle).toBeInTheDocument();
  });

  it("can show error message after submitting in InputStep", async () => {
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    fireEvent.change(originInput, { target: { value: SubmitRoutingOrigin.ServerErrorOrigin } });
    fireEvent.change(destinationInput, { target: { value: "Destination" } });

    await userEvent.click(submitButton);

    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    const errorMessage = screen.getByTestId("error-message");

    expect(errorMessage).toBeInTheDocument();
  });

  it("can show InProgressStep after submitting in InputStep", async () => {
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    fireEvent.change(originInput, { target: { value: SubmitRoutingOrigin.InProgressOrigin } });
    fireEvent.change(destinationInput, { target: { value: "Destination" } });

    await userEvent.click(submitButton);

    expect(originInput).not.toBeInTheDocument();
    expect(destinationInput).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    const inProgressLine = screen.getByText(/We are processing your routing\, stay tuned\!/i);

    expect(inProgressLine).toBeInTheDocument();
  });

  it("can show FailedStep of returned error message after submitting in InputStep", async () => {
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    fireEvent.change(originInput, { target: { value: SubmitRoutingOrigin.FailureOrigin } });
    fireEvent.change(destinationInput, { target: { value: "Destination" } });

    await userEvent.click(submitButton);

    expect(originInput).not.toBeInTheDocument();
    expect(destinationInput).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    const errorMessage = screen.getByText(/Location not accessible by car/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("can show FailedStep of fixed error message after submitting in InputStep", async () => {
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    fireEvent.change(originInput, { target: { value: SubmitRoutingOrigin.ProcessErrorOrigin } });
    fireEvent.change(destinationInput, { target: { value: "Destination" } });

    await userEvent.click(submitButton);

    expect(originInput).not.toBeInTheDocument();
    expect(destinationInput).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    const errorMessage = screen.getByText(
      /Sorry\, We cannot process your routing\. Please try again later\./i,
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
