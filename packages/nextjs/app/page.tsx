"use client";
import { useEffect, useState } from "react";
import { useContractWrite, useContractRead, useAccount } from "wagmi";
import { YourContractABI } from "../../../abi/YourContractABI";

export default function VotingPage() {
    const { address } = useAccount();
    const [optionsList, setOptionsList] = useState<number[]>([]);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

    const { data: isVotingOpen } = useContractRead({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: YourContractABI,
        functionName: "votingActive",
    });

    const { data: votingOptions } = useContractRead({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: YourContractABI,
        functionName: "getOptions",
    });

    const { data: voteCount } = useContractRead({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: YourContractABI,
        functionName: "getVotes",
        args: [selectedChoice || 0],
    });

    const { write: registerVoter } = useContractWrite({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: YourContractABI,
        functionName: "addVoter",
    });

    const { write: castVote } = useContractWrite({
        address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        abi: YourContractABI,
        functionName: "vote",
    });

    useEffect(() => {
        if (votingOptions) {
            setOptionsList(votingOptions as number[]);
        }
    }, [votingOptions]);

    const handleCastVote = () => {
        if (selectedChoice !== null) {
            castVote({ args: [selectedChoice] });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Voting App</h1>
                {isVotingOpen ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Options:</h2>
                        <ul className="space-y-2">
                            {optionsList.map((option) => (
                                <li key={option} className="flex items-center">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={option}
                                            onChange={() => setSelectedChoice(option)}
                                            className="form-radio text-blue-500"
                                        />
                                        <span className="text-gray-700">Option {option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleCastVote}
                            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Vote
                        </button>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Voting is not active.</p>
                )}
                {voteCount !== undefined && (
                    <p className="mt-4 text-center text-gray-700">
                        Votes for selected option: <span className="font-bold">{voteCount.toString()}</span>
                    </p>
                )}
                {address && (
                    <button
                        onClick={() => registerVoter({ args: [address] })}
                        className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Register as Voter
                    </button>
                )}
            </div>
        </div>
    );
}