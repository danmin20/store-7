import { css, DefaultTheme } from "styled-components";

const font = {
  small: css`
    font-size: 1.2rem;
    font-weight: 400;
  `,
  medium: css`
    font-size: 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 2rem;
    font-weight: 700;
  `,
  xlarge: css`
    font-size: 3rem;
    font-weight: 700;
  `,
};

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const shadow = css`
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.07);
`;

const borderRadius = {
  small: css`
    border-radius: 0.5rem;
  `,
  medium: css`
    border-radius: 1rem;
  `,
  large: css`
    border-radius: 2rem;
  `,
};

const tags = {
  new: css`
    background: #07c7d1;
    color: white;
  `,
  best: css`
    background: black;
    color: white;
  `,
  sale: css`
    background: #f45452;
    color: white;
  `,
  green: css`
    background: #06b788;
    color: white;
  `,
};

const calculateMargin = (
  gap: string,
  direction: "row" | "column" | "column-reverse"
) => {
  if (direction === "row") return `margin-left: ${gap}`;
  if (direction === "column") return `margin-top: ${gap}`;
  if (direction === "column-reverse") return `margin-bottom: ${gap}`;
  return "";
};

export const gap = (
  gapLength: string,
  direction: "row" | "column" | "column-reverse" = "row"
) => {
  return css`
    & > * + * {
      ${calculateMargin(gapLength, direction)}
    }
  `;
};

export const theme: DefaultTheme = {
  color: {
    title_active: "#1e2222",
    body: "#626666",
    label: "#8d9393",
    placeholder: "#c1c5c5",
    light_grey1: "#eeeeee",
    light_grey2: "#dddddd",
    error_color: "#f45452",
    grey1: "#888888",
    grey2: "#bbbbbb",
    line: "#ccd3d3",
    white: "#ffffff",
    background: "#f9f9f9",
    off_white: "#fcfcfc",
    primary1: "#3be1b4",
    primary2: "#89F4D8",
    primary3: "#32BF9A",
    red: "#f45452",
  },
  font,
  flexCenter,
  shadow,
  borderRadius,
  tags,
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  1440: customMediaQuery(1440),
  768: customMediaQuery(768),
  tablet: customMediaQuery(1100),
  mobile: customMediaQuery(500),
};

export const hideScroll = css`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
