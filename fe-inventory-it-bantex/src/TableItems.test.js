// TableItems.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { TableItems } from "./components/molecules";

// Mock data for testing
const mockData = [
  {
    id: 1,
    item_no: "ABC123",
    item_description: "Sample Item",
    brand: "Sample Brand",
    unit: "Each",
    item_specification: "Sample Specification",
    category: "Sample Category",
    status: "Active",
    kondisi: "Good",
    item_location: "Warehouse A",
    note: "Sample Note",
    date_registration: "2023-01-01",
    date_expired: "2023-12-31",
    post_username: "user123",
    post_date: "2023-01-02",
  },
  // Add more mock data as needed
];

test("renders table headers and data correctly", () => {
  // Render the TableItems component with mock data
  render(<TableItems data={mockData} />);

  // Check if table headers are rendered
  expect(screen.getByText("No")).toBeInTheDocument();
  expect(screen.getByText("Item No")).toBeInTheDocument();
  expect(screen.getByText("Description")).toBeInTheDocument();
  // Add more expectations for other headers

  // Check if table data is rendered
  expect(screen.getByText("ABC123")).toBeInTheDocument();
  expect(screen.getByText("Sample Item")).toBeInTheDocument();
  // Add more expectations for other data

  // You can add more assertions based on your component structure
  // For example, you can check if buttons are rendered and clickable
});

// You can add more tests for specific functionalities if needed
// For example, you can add tests for the onClick handlers of buttons
