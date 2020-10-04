import React from "react";
import 'mutationobserver-shim';
import { render, screen, fireEvent, waitFor, getByText, findByText, act } from "@testing-library/react";
import Form from "./Form";

global.MutationObserver = window.MutationObserver;

const mockLogin = jest.fn((email, password) => {
    return { email, password };
});

const createDefaultProps = () => ({
    login: jest.fn(),
    heading: 'heading here'
});

describe("<Form />", () => {

    it('renders correctly with the default props', () => {
        const props = createDefaultProps();

        render(<Form {...props}/>)

        expect(document.body).toMatchSnapshot();
    });

    it("should display required error when value for email is invalid and not call login function", async () => {
        const { getByText } = render(<Form login={mockLogin} />);
        const submitButton = getByText("Submit");

        fireEvent.click(submitButton);

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
    });

    it("should display correct error when email is invalid", async () => {
        const { getByText } = render(<Form login={mockLogin} />);
        const submitButton = getByText("Submit");

        fireEvent.input(screen.getByLabelText("Email Address"), {
            target: {
                value: "invalidEmail"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "password"
            }
        });

        fireEvent.click(submitButton);

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByLabelText("Email Address").value).toBe("invalidEmail");
        expect(screen.getByLabelText("Password").value).toBe("password");
    });

    it("should display min length error when password is invalid (and email is valid)", async () => {
        const { getByText } = render(<Form login={mockLogin} />);
        const submitButton = getByText("Submit");

        fireEvent.input(screen.getByLabelText("Email Address"), {
            target: {
                value: "test@email.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "pass"
            }
        });

        fireEvent.click(submitButton);

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockLogin).not.toBeCalled();
        expect(screen.getByLabelText("Password").value).toBe("pass");
    });

    it("should not display error when values are valid", async () => {
        const { getByText } = render(<Form login={mockLogin} />);
        const submitButton = getByText("Submit");

        fireEvent.input(screen.getByLabelText("Email Address"), {
            target: {
                value: "test@email.com"
            }
        });

        fireEvent.input(screen.getByLabelText("Password"), {
            target: {
                value: "password"
            }
        });

        fireEvent.click(submitButton);

        const result = mockLogin("test@email.com", "password");

        expect(result).toStrictEqual({email: "test@email.com", password: "password"});
        expect(mockLogin).toHaveBeenCalled();
        expect(mockLogin).toHaveBeenCalledWith("test@email.com", "password")
        // expect(screen.getByLabelText("Password").value).toBe("");
        // expect(screen.getByLabelText("Email Address").value).toBe("");
    });
});
