import { Environment, ParaMobile } from "@getpara/react-native-wallet";

// Replace with your actual API key
const PARA_API_KEY = process.env.EXPO_PUBLIC_PARA_API_KEY || "YOUR_API_KEY";

export const para = new ParaMobile(Environment.BETA, PARA_API_KEY);
