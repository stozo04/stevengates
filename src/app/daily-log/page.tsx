"use client";

import DailyLogForm from '@/components/daily-log/DailyLogForm';
import { useState } from 'react';

const DailyLogPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        // Check password against the environment variable
        const secretPassword = process.env.NEXT_PUBLIC_SECRET_PASSWORD;
        if (password === secretPassword) {
            setAuthenticated(true);
        } else {
            alert('Incorrect password!');
        }
    };

    if (!authenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl">Enter Password</h1>
                <input
                    type="password"
                    className="border p-2 mt-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secret password"
                />
                <button className="btn mt-4" onClick={handleLogin}>
                    Log In
                </button>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl">Daily Log</h1>
            <DailyLogForm />
        </div>
    );
};

export default DailyLogPage;
