import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "../../src/pages/MainPage";

const queryClient = new QueryClient();

describe("MainPage", () => {
  it("renders the MainPage component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>,
    );
    const modalHeader = screen.getByText(/Welcome\, enjoy this lemon tea\!/i);
    const originInput = screen.getByPlaceholderText(/Enter your origin/i);
    const destinationInput = screen.getByPlaceholderText(/Enter your destination/i);
    const submitButton = screen.getByTestId(/submit\-button/i);

    expect(modalHeader).toBeInTheDocument();
    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
