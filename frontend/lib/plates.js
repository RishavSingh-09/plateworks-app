// Competition plate colours (IWF): 25 red, 20 blue, 15 yellow, 10 green, 5 white.
export const PLATES = {
  5: { bg: '#F5F5F2', fg: '#181C1F', edge: '#181C1F', name: 'white' },
  10: { bg: '#1E8E4E', fg: '#FFFFFF', edge: '#14663A', name: 'green' },
  15: { bg: '#F2B705', fg: '#181C1F', edge: '#B98A00', name: 'yellow' },
  20: { bg: '#1F5FBF', fg: '#FFFFFF', edge: '#16438A', name: 'blue' },
  25: { bg: '#D7263D', fg: '#FFFFFF', edge: '#9E1A2C', name: 'red' },
};

// Class intensity 1..5 -> plate weight
export const intensityToKg = (n) => [5, 10, 15, 20, 25][Math.min(5, Math.max(1, n || 1)) - 1];

export const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export const titleCase = (s) => s.charAt(0).toUpperCase() + s.slice(1);
