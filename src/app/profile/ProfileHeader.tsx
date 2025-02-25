import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import StyledTypography from "@/components/common/StyledTypography";
import { SECTIONS } from "./ProfileContent";

interface ProfileHeaderProps {
    activeSection: "history" | "settings" | "support" | "billing";
    handleSectionClick: (key: "history" | "settings" | "support" | "billing") => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ activeSection, handleSectionClick }) => {
    const username = useSelector((state: RootState) => state.profile.user?.username);

    const getIndicatorStyle = () => {
        const offsets = {
            history: "0px",
            settings: "calc(6px + 100%)",
            support: "calc(12px + 200%)",
            billing: "calc(18px + 300%)",
        };
        return { transform: `translateY(${offsets[activeSection]})` };
    };

    return (
        <article className="profile-header">
            <StyledTypography variant="body1" className="profile-title">
                Добро пожаловать,<br /> <b>{username || "Гость"}</b>
            </StyledTypography>
            <nav className="profile-header-navigation">
                <ul style={{ position: "relative" }}>
                    <div className="indicator" style={getIndicatorStyle()} />
                    {SECTIONS.map(({ key, label }) => (
                        <li key={key}>
                            <button
                                onClick={() => handleSectionClick(key)}
                                className={activeSection === key ? "active" : ""}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </article>
    );
};

export default ProfileHeader;
