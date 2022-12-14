import { useCurrentDate } from "./useCurrentDate";
import { StyledTimeContainer } from "./styled";

const formatDate = (date) => {
    return date.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};

export const shortFormatDate = (date) => {
    return date.toLocaleString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const Time = () => {
    const date = useCurrentDate();
    return (
        <StyledTimeContainer>
            <p>
                Current time: {formatDate(date)}
            </p>
        </StyledTimeContainer>
    );
};

export default Time;