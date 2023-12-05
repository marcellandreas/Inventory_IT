// example.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // untuk menggunakan ekstensi expect dari testing-library
import { MainLayout } from "./components/templates";

test("renders component with correct text ", () => {
  render(<MainLayout />);
  expect(screen.getByText("Hello, World!")).toBeInTheDocument();
});
