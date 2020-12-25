import React from 'react'
import {render, fireEvent} from "@testing-library/react";
import {Checkbox} from '../components/UI/Checkbox/Checkbox'

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
            const {getByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(getByTestId('checkbox-action')).toBeTruthy();
        });
        it('render the task checkbox and accepts a onClick', () => {
            const {getByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(getByTestId('checkbox-action')).toBeTruthy();
            fireEvent.click(getByTestId('checkbox-action'));
        });
        it('render the task checkbox and accepts a Enter onKeyDown', () => {
            const {getByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(getByTestId('checkbox-action')).toBeTruthy();
            fireEvent.keyDown(getByTestId('checkbox-action'), { key: 'Enter', code: 'Enter' });
        });
        it('render the task checkbox and accepts a any onKeyDown', () => {
            const {getByTestId} = render(<Checkbox id={'1'} taskDesc={'Finish this app'}/>);
            expect(getByTestId('checkbox-action')).toBeTruthy();
            fireEvent.keyDown(getByTestId('checkbox-action'), { key: 'a', code: 'KeyA' });
        });
    })
})
