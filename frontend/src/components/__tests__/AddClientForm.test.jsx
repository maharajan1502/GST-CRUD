import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddClientForm from "../AddClientForm";

jest.mock("axios");

describe("AddClientForm Component", () => {

  beforeAll(() => {
  window.alert = jest.fn();
});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<AddClientForm />);

    expect(screen.getByLabelText(/Business Entity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GSTIN/i)).toBeInTheDocument();
  });

  it("updates input fields", () => {
    render(<AddClientForm />);

    const nameInput = screen.getByLabelText(/Business Name/i);
    fireEvent.change(nameInput, { target: { value: "My Company" } });

    expect(nameInput.value).toBe("My Company");
  });

  it("calls GST Verify API and auto-fills fields", async () => {
    const mockGSTResponse = {
      data: {
        data: {
          lgnm: "Test Enterprise",
          pradr: {
            addr: {
              bnm: "Building 1",
              st: "Bangalore",
              pncd: "560001"
            }
          }
        }
      }
    };

    axios.post.mockResolvedValueOnce(mockGSTResponse);

    render(<AddClientForm />);

    fireEvent.change(screen.getByLabelText(/GSTIN/i), { target: { value: "29AAAAA0000A1Z5" } });
    fireEvent.click(screen.getByRole("button", { name: /verify/i }));

  });

  it("saves client successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<AddClientForm />);

    fireEvent.change(screen.getByLabelText(/Business Name/i), { target: { value: "My Biz" } });
    fireEvent.change(screen.getByLabelText(/Contact Name/i), { target: { value: "Raja" } });
    fireEvent.change(screen.getByLabelText(/GSTIN/i), { target: { value: "29AAAAA0000A1Z5" } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: "KA" } });

    fireEvent.click(screen.getByText(/Save/i));

   
  });
});
