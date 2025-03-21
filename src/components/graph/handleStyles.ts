
const triangleStyle = {
    width: '13px',
    height: '13px',
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    borderRadius: '0', // Ensure no rounding
    border: '0px solid white',
    outline: 'none', // Ensure no outline affects the look
    boxShadow: 'none', // Prevent any shadow artifacts
    padding: '0', // Ensure no spacing issues
    margin: '0', // Remove any unwanted margins
};

const clippedCircleStyle = {
    width: '12px',
    height: '12px',
    clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
    borderRadius: '50%', // Keeps the circular shape while trimming
    border: '1px solid white',
    outline: 'none',
    boxShadow: 'none',
    padding: '0',
    margin: '0px',
};

const squareStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '0', // No rounding, keep it square
    border: '1px solid white', // Remove any default borders
    outline: 'none', // Ensure no outline affects the look
    boxShadow: 'none', // Prevent any shadow artifacts
    padding: '0', // Ensure no spacing issues
    margin: '0px', // Remove any unwanted margins
};

const circleStyle = {
    width:'10px',
    height:'10px',
}

//Mapping of types to styles
export const stylePalette = {
    "event": clippedCircleStyle,
    "tuple": clippedCircleStyle,
    "dataframe": squareStyle,
    "petrinet": squareStyle,
    "heuristics": clippedCircleStyle,
    "model": triangleStyle,
    "conformance": triangleStyle,
    "any": squareStyle
}

//Mapping of types to colors
export const colorPalette = {
    "tuple": "#ffbd00",
    "dataframe": "#FF69B4",
    "event": "#32CD32",
    "petrinet": "#450045",
    "heuristics": "#8A2BE2",
    "model": "#DC143C",
    "conformance": "#4682B4",
    "any": "grey"            // Wildcard color
};