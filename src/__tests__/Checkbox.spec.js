import React from 'react'
import {render, cleanup, fireEvent} from "@testing-library/react";
import {Checkbox} from '../components/Checkbox'

beforeEach(cleanup);

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    update: jest.fn(),
                })),
            })),
        })),
    },
}));

describe('<Checkbox/>', () => {
    describe('Success', () => {
        it('render the task checkbox', () => {
            const {queryByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(queryByTestId('checkbox-action')).toBeTruthy();
        });
        it('render the task checkbox and accepts a onClick', () => {
            const {queryByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.click(queryByTestId('checkbox-action'));
        });
        it('render the task checkbox and accepts a onKeyDown', () => {
            const {queryByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(queryByTestId('checkbox-action')).toBeTruthy();
            fireEvent.keyDown(queryByTestId('checkbox-action'));
        });
    })
})
