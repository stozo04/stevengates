"use client";

import { useState, useEffect } from "react";

const Log = () => {
    const [formData, setFormData] = useState({
        date: '',
        anxiety_level: '',
        panic_attack: false,
        used_medication: false,
        went_to_gym: false,
        had_sex: false,
        mood: '',
        notes: '',
    });

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData((prev) => ({ ...prev, date: today }));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Daily log saved successfully!');
            setFormData((prev) => ({
                ...prev,
                anxiety_level: '',
                panic_attack: false,
                used_medication: false,
                went_to_gym: false,
                had_sex: false,
                mood: '',
                notes: '',
            }));
        } else {
            alert('Oops, something went wrong!');
        }
    };

    return (
        <div>
            <section className="pt-120 pb-120 mt-10 mt-lg-0">
                <div className="container">
                    <form className="d-flex flex-column gap-4 gap-md-8" onSubmit={handleSubmit}>
                        <div className="brn4 p-3 p-md-5 rounded">
                            <h5 className="fs-six fw-medium n5-color mb-3 mb-md-5">
                                Create a Daily Log
                            </h5>
                            <div>


                                <label className="fs-eight fw-medium n5-color mb-3 mb-md-5">Date:</label>
                                <input
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="py-3">
                                <label className="fs-eight fw-medium n5-color mb-3 mb-md-5">Anxiety Level:</label>
                                <select
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    name="anxiety_level"
                                    value={formData.anxiety_level}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select...</option>
                                    <option value="1">Perfect</option>
                                    <option value="2">Felt Normal</option>
                                    <option value="3">Relaxed</option>
                                    <option value="4">Not bothered</option>
                                    <option value="5">Average</option>
                                    <option value="6">Tense</option>
                                    <option value="7">Had to sleep</option>
                                    <option value="8">Panic Attack</option>
                                    <option value="9">Critical</option>
                                    <option value="10">Hospital</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center gap-2 py-3">
                                <input
                                    type="checkbox"
                                    id="panic_attack"
                                    name="panic_attack"
                                    checked={formData.panic_attack}
                                    onChange={handleChange}
                                />
                                <label htmlFor="panic_attack" className="n4-color fs-eight cursor-pointer">Panic Attack?</label>
                            </div>
                            <div className="d-flex align-items-center gap-2 py-3">
                                <input
                                    type="checkbox"
                                    id="used_medication"
                                    name="used_medication"
                                    checked={formData.used_medication}
                                    onChange={handleChange}
                                />
                                <label htmlFor="used_medication" className="n4-color fs-eight cursor-pointer">Used Emergency Medication?</label>
                            </div>
                            <div className="d-flex align-items-center gap-2 py-3">
                                <input
                                    type="checkbox"
                                    id="went_to_gym"
                                    name="went_to_gym"
                                    checked={formData.went_to_gym}
                                    onChange={handleChange}
                                />
                                <label htmlFor="went_to_gym" className="n4-color fs-eight cursor-pointer">Went to Gym?</label>
                            </div>
                            <div className="d-flex align-items-center gap-2 py-3">
                                <input
                                    type="checkbox"
                                    id="had_sex"
                                    name="had_sex"
                                    checked={formData.had_sex}
                                    onChange={handleChange}
                                />
                                <label htmlFor="had_sex" className="n4-color fs-eight cursor-pointer">Had Sex?</label>
                            </div>
                            <div className="py-3">
                                <label className="shadow-sm fs-eight fw-medium n5-color mb-3 mb-md-5">Mood:</label>
     
                                <textarea
                                    name="mood"
                                    value={formData.mood}
                                    onChange={handleChange}
                                    placeholder="Mood"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                />
                            </div>
                            <div className="py-3">
                                <label className="fs-eight fw-medium n5-color mb-3 mb-md-5">Notes:</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Notes"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                />

                            </div>
                        </div>
                        <button type="submit" className="p-btn bg1-color w-100 py-3 py-md-4">Add Log</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Log;
