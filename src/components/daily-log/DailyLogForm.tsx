import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"


const DailyLogForm = () => {
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

    // Set the default date to today's date
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        setFormData((prev) => ({ ...prev, date: today }));
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Daily log saved successfully!');
            setFormData({
                date: formData.date, // Keep the current date
                anxiety_level: '',
                panic_attack: false,
                used_medication: false,
                went_to_gym: false,
                had_sex: false,
                mood: '',
                notes: '',
            });
        } else {
            alert('Oops, something went wrong!');
        }
    };

    return (
        <div className="flex items-center justify-center py-4">
            <section className="w-full border border-white-500">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg border border-2 dark:border-red-50 light:border-red-600">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Create Daily Log</h2>
                    <form
                        className="space-y-8"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Anxiety Level:</label>
                            <select
                                name="anxiety_level"
                                value={formData.anxiety_level}
                                onChange={handleChange}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
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

                        <div className="space-y-2">
                            {[
                                { label: 'Panic Attack?', name: 'panic_attack' },
                                { label: 'Used Emergency Medication?', name: 'used_medication' },
                                { label: 'Went to Gym?', name: 'went_to_gym' },
                                { label: 'Had Sex?', name: 'had_sex' },
                            ].map((field) => (
                                <div key={field.name} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        checked={formData[field.name as keyof typeof formData] as boolean}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                                    />
                                    <label className="ml-2 text-gray-700 dark:text-gray-200">{field.label}</label>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Mood:</label>
                            <input
                                type="text"
                                name="mood"
                                value={formData.mood}
                                onChange={handleChange}
                                placeholder="Describe your mood"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 dark:text-gray-200">Notes:</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Any additional notes..."
                                rows={4}
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            />
                        </div>
                        <Button type="submit" className="mt-2">
                            Create Log
                        </Button>

                    </form>
                </div>
            </section>
        </div>
    )
};

export default DailyLogForm;

