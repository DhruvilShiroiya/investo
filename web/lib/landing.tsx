import {
  BarChart3,
  LineChart,
  Database,
  Bot,
  Lock,
  Sparkles,
} from "lucide-react";

export const statsData = [
  {
    value: "10+ Yrs",
    label: "Market Data Analyzed",
  },
  {
    value: "1M+",
    label: "News Articles Processed",
  },
  {
    value: "95%",
    label: "Sentiment Accuracy",
  },
  {
    value: "24/7",
    label: "AI Assistant Availability",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Stocks & Metals Portfolio Guidance",
    description:
      "AI-driven insights to help you balance investments between stocks and metals.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: "Historical News Sentiment Analysis",
    description:
      "Leverage years of market data and sentiment trends to make informed decisions.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-blue-600" />,
    title: "Real-Time Market Trends",
    description:
      "Stay ahead with up-to-date price movements and performance dashboards.",
  },
  {
    icon: <Bot className="h-8 w-8 text-blue-600" />,
    title: "AI Investment Chatbot",
    description:
      "Chat with our ML-powered assistant to get personalized investment guidance.",
  },
  {
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    title: "Secure Authentication",
    description:
      "Enterprise-grade authentication ensures your portfolio data stays private.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Personalized Insights",
    description:
      "Get actionable strategies tailored to your portfolio and goals.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    title: "1. Sign Up Securely",
    description:
      "Create your account with secure authentication and start your journey.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: "2. Connect & Analyze",
    description:
      "Sync your portfolio or upload data. Our AI models analyze historical and live data.",
  },
  {
    icon: <Bot className="h-8 w-8 text-blue-600" />,
    title: "3. Get AI-Powered Guidance",
    description:
      "Chat with the assistant and explore dashboards for smart investment decisions.",
  },
];
