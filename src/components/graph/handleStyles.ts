
const triangleStyle = {
    width: '11px',
    height: '11px',

    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    borderRadius: '0', // Ensure no rounding
    border: '0px solid white',
    outline: 'none', // Ensure no outline affects the look
    boxShadow: 'none', // Prevent any shadow artifacts
    padding: '0', // Ensure no spacing issues
    margin: '0', // Remove any unwanted margins
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
    "tuple": squareStyle,
    "dataframe": squareStyle,
    "event": circleStyle,
    "petrinet": squareStyle,
    "heuristics": circleStyle,
    "model": triangleStyle,
    "conformance": triangleStyle,
    "any": squareStyle
}

//Mapping of types to colors
export const colorPalette = {
    "tuple": "#ffbd00",
    "dataframe": "#FF1493",
    "event": "#32CD32",
    "petrinet": "#450045",
    "heuristics": "#8A2BE2",
    "model": "#DC143C",
    "conformance": "#4682B4",
    "any": "grey"            // Wildcard color
};