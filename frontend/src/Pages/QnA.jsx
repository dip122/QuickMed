import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/Context';
import axios from 'axios';
import { qnaapi } from '../Apis/Apiroutes';
import Markdown from "react-markdown";

const QnA = () => {
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [medical_history, setMedicalHistory] = useState("");
    const [wentwrong, setWentwrong] = useState("fasle");
    const [auth, setAuth] = useAuth();
    const [output, setOutput] = useState("");

    const MakeValidation = () => {
        if (gender === "") {
            setWentwrong("true");
            return false;
        } else if (age === "") {
            setWentwrong("true");
            return false;
        } else if (symptoms === "" || medical_history === "") {
            setWentwrong("true");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validation
        if (!MakeValidation()) return false;

        try {
            // Construct the request payload
            const data = {
                gender: gender,
                age: parseInt(age), // Convert age to an integer
                symptoms: symptoms,
                medical_history: medical_history
            };

            setWentwrong("generating")

            // Send POST request to backend
            const response = await axios.post(qnaapi, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response && response.data) {
                setWentwrong("false")
                console.log(response.data);
                setOutput(response.data.raw || "a");  // Adjusted to match expected API response
            } else {
                setOutput("");
                setWentwrong("true");
            }
        } catch (error) {
            console.log(error);
            setWentwrong("servererror");
        }
    }

    return (
        <div className="qna w-full flex flex-col justify-center mb-15">
            <div className="flex flex-col justify-center items-center p-10">
                <div className="header mb-10 font-semibold text-lg text-center">
                    QNA chatBot, Welcome! Know Immediate Reason Of Symptoms
                </div>
                <form className="form-box flex flex-col gap-y-6 w-3/5 justify-center items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="gender"
                        className="apperence-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Enter your Gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                    <input
                        type="text"
                        name="age"
                        className="apperence-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:z-10 sm:text-sm"
                        placeholder="Enter Your Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                        type='text'
                        name='symptoms'
                        className="apperence-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 rounded-lg focus:outline-none focus:z-10 sm:text-sm text-gray-900"
                        placeholder='Enter Your symptoms'
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                    />
                    <input
                        type="text"
                        name='medical_history'
                        className="apperence-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 rounded-lg focus:outline-none focus:z-10 sm:text-sm text-gray-900"
                        placeholder="Enter Medical history"
                        value={medical_history}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                    />
                    <button type="submit" className="p-3 bg-purple-500 rounded-lg hover:bg-purple-600 text-white font-semibold">
                        Generate
                    </button>
                </form>
            </div>

            <div className="output-section text-center flex justify-center items-center pt-5 pl-20 pr-20 pb-10">
                {wentwrong === 'true' ? <div className="font-semibold p-2">Something went wrong</div> : (wentwrong === 'servererror' ? <div className = "font-semibold p-2">Server Side Error</div> : (wentwrong === 'generating' ? <div className = "font-semibold p-2">Generating</div> : 
                <Markdown className = "max-md:text-sm font-normal text-neutral-900 whitespace-pre-wrap break-all">
                    {output}
                </Markdown>)) }
            </div>
        </div>
    );
}

export default QnA;
