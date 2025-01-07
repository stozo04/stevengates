"use client";
import { useState } from "react";
import { PiTrophy } from "react-icons/pi";
import AwardModal from "@/components/Shared/Modal/AwardModal";
import mcsa from "@/../public/images/mcsa.jpg";
import mcsd from "@/../public/images/mcsd.jpg";
import cs50 from "@/../public/images/cs50-award.jpg";
import { StaticImageData } from "next/image";


const AwardsSection = () => {
    type Award = {
        id: number;
        title: string;
        year: string;
        image: StaticImageData;
    };
    const [selectedAward, setSelectedAward] = useState<Award | null>(null);
    const handleOpenModal = (award: any) => {
        setSelectedAward(award);
    };

    const handleCloseModal = () => {
        setSelectedAward(null);
    };
    const awardsData = [
        { id: 1, title: "CS50 Introduction to AI with Python", year: "2024", image: cs50 },
        { id: 2, title: "Microsoft Certified Solutions Developer", year: "2018", image: mcsd },
        { id: 3, title: "Microsoft Certified Solutions Associate", year: "2018", image: mcsa }
    ];

    return (
        <div className="mb-8 mb-md-15">
            <div className="d-flex align-items-center gap-2 mb-3 mb-md-6">
                <div className="title-line2"></div>
                <h2 className="fs-three p1-color fw-semibold">Awards</h2>
            </div>
            {awardsData.map((award) => (
                <div
                    key={award.id}
                    className="d-flex gap-2 mb-3 mb-md-5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(award)}
                >
                    <i className="fs-six p1-color">
                        <PiTrophy />
                    </i>
                    <div>
                        <span className="n4-color fs-seven">{award.title}</span>
                        <span className="n4-color fs-eleven">{award.year}</span>
                    </div>
                </div>
            ))}

            {/* Dynamic Modal */}

            <AwardModal award={selectedAward} onClose={handleCloseModal}/>

        </div>
    );
};

export default AwardsSection;
