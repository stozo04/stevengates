import { useState, useEffect } from 'react';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
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
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 mt-8"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Anxiety Level:</label>
                <select
                    name="anxiety_level"
                    value={formData.anxiety_level}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    <option value="">Select...</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Bad">Bad</option>
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
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm text-gray-700">{field.label}</label>
                    </div>
                ))}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mood:</label>
                <input
                    type="text"
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                    placeholder="Describe your mood"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Notes:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes..."
                    rows={4}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Save Log
            </button>
        </form>
    );
};

export default DailyLogForm;