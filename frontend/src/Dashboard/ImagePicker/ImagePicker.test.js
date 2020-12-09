import { render, screen, fireEvent, waitFor, getByText, findByText, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ImagePicker from "./ImagePicker";

const createDefaultProps = () => ({
    submitImage: jest.fn(),
    removeImage: jest.fn(),
    currentImage: null
})

describe('ImagePicker', () => {
    it('should render correctly', () => {
        const { container } = render(
            <ImagePicker {...createDefaultProps()} />
        );

        expect(container).toMatchSnapshot();
    });

    it('should call submitImage prop when Upload Image button is clicked with an image selected', () => {
        const props = createDefaultProps()
        const { container } = render(
            <ImagePicker {...props} />
        );

        const file = new File(["hello"], "hello.png", {type: "image/png"});
        const inputFileEl = container.querySelector('input');
        userEvent.upload(inputFileEl, file);

        expect(props.submitImage).toHaveBeenCalledTimes(1);
    });

    it('should upload a file', () => {
        const { container } = render(
            <ImagePicker {...createDefaultProps()} />
        );

        const file = new File(["hello"], "hello.png", { type: "image/png" });
        const inputFileEl = container.querySelector('input');
        userEvent.upload(inputFileEl, file);

        expect(inputFileEl.files[0]).toStrictEqual(file);
        expect(inputFileEl.files.item(0)).toStrictEqual(file);
        expect(inputFileEl.files).toHaveLength(1);
        
    });

    it('should show an image when the currentImage prop is not null', () => {
        const props = createDefaultProps({currentImage="hello.png"})
        const { container } = render(
            <ImagePicker
                {...props}
            />
        );

        const img = container.querySelector('img');
        expect(img).toBeInTheDocument();
    });
})

