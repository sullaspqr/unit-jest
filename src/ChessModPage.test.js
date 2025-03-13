import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ChessModPage } from "./ChessModPage";
import '@testing-library/jest-dom';
import { data } from "react-router-dom"; 
import axios from "axios";  
jest.mock("react-router-dom", () => ({ // a react-router-dom mock-olása
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));
jest.mock('axios'); // mockoljuk az axios-et

describe("Renderelés", () => {
    it("módosító mezők renderelése", async () =>{
       axios.get.mockResolvedValueOnce({ // axios kiváltása, egy előre definiált válasszal:
            data: {
                name: 'Test Chess Player',
                birth_date: '1990-01-01',
                world_ch_won: 5,
                profile_url: 'https://example.com/profile',
                image_url: 'https://example.com/image.jpg'
            }
        });
        render(<ChessModPage/>);
        await waitFor(() => {
        expect(screen.getByLabelText("Sakkozó név:")).toBeInTheDocument(); // csak akkor találja meg a label-t,
        //ha létezik hozzá a label tag-en belül htmlFor ami a name-vel egyezik, és 
        //az input mezőben is létezik egy id aminek a property-je megegyezik a htmlFor-al!
        expect(screen.getByLabelText("Születési dátum:")).toBeInTheDocument();
        expect(screen.getByLabelText("Nyert világbajnokságok:")).toBeInTheDocument();
    });
    })});
    describe("Űrlapmezők", () => {
    it("űrlapmezők kitöltése", async () => {
        axios.get.mockResolvedValueOnce({ // axios kiváltása, egy előre definiált válasszal:
            data: {
                name: 'Test Chess Player',
                birth_date: '1990-01-01',
                world_ch_won: 5,
                profile_url: 'https://example.com/profile',
                image_url: 'https://example.com/image.jpg'
            }
        });
        render(<ChessModPage/>);
        await waitFor(() => {
        const nameInput = screen.getByPlaceholderText("name");
        const birthDateInput = screen.getByPlaceholderText("birth_date");
        const worldChInput = screen.getByPlaceholderText("world_ch_won");
        const profileUrlInput = screen.getByPlaceholderText("profile_url");
        const imageUrlInput = screen.getByPlaceholderText("image_url");
        fireEvent.change(nameInput, { target: { value: "Németh Bence" } });
        expect(nameInput.value).toBe("Németh Bence");
        fireEvent.change(birthDateInput, { target: { value: "2000-01-01" } });
        expect(birthDateInput.value).toBe("2000-01-01");
        fireEvent.change(worldChInput, { target: { value: "1" } });
        expect(worldChInput.value).toBe("1");
        fireEvent.change(profileUrlInput, { target: { value: "https://example.com/profile" } });
        expect(profileUrlInput.value).toBe("https://example.com/profile");
        fireEvent.change(imageUrlInput, { target: { value: "https://example.com/image.jpg" } });
        expect(imageUrlInput.value).toBe("https://example.com/image.jpg");
        });
    })
})