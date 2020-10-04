import React from "react";
import 'mutationobserver-shim';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { render, fireEvent, container, getByText, act, getByRole } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import App from "./App";

describe("<App />", () => {
    let history;
    beforeEach(() => {
        history = createBrowserHistory();
    });

    it('renders correctly', () => {
        render(<App />)
        expect(document.body).toMatchSnapshot();
    });

    // it('navigates to the sign in page when you click the "Sign in" link', () => {
    //     const { container, getByText } = render(<App />);
        
    //     // interact with the page
    //     act(() => {
    //         // find the link
    //         const signInLink = getByText("Sign in");

    //         fireEvent.click(signInLink);
    //     })

    //     expect(document.body.textContent).toContain('Email Address')
    // });

    it('page renders and can click on links to navigate', () => {
        const {container, getByText} = render(
            <Router history={history}>
                <App/>
            </Router>
        )

        // verify page content for expected route
        // MUSTDO: UPDATE THIS WHEN THE LANDING PAGE IS CREATED
        expect(container.innerHTML).toMatch(`I'm the landing`);

        fireEvent.click(getByText(/sign in/i))

        // check the content changed to the new page
        // MUSTDO: UPDATE THIS WHEN THE SIGN IN PAGE IS UPDATED?
        expect(container.innerHTML).toContain('Email Address')
    });

    it('routes to the 404 page for a bad URL', () => {
        history.push('/bad/route')

        const {getByRole} = render(
            <Router history={history}>
                <App />
            </Router>
        )

        expect(getByRole('heading')).toHaveTextContent('404 Not Found');
    })

});