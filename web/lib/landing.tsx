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
    value: "10+",
    label: "Years Market Data Analyzed",
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
    title: "Stocks–Metals Correlation Insights",
    description:
      "Quantify co-movements between equities and metals to understand diversification.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: "Historical & News Sentiment",
    description:
      "Blend long-horizon data with current headlines to contextualize correlation shifts.",
  },
  {
    icon: <LineChart className="h-8 w-8 text-blue-600" />,
    title: "Real-Time Market Signals",
    description:
      "Track live signals that may strengthen or weaken stocks–metals relationships.",
  },
  {
    icon: <Bot className="h-8 w-8 text-blue-600" />,
    title: "AI Insight Assistant",
    description:
      "Ask portfolio-aware questions and receive correlation-driven techniques.",
  },
  {
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    title: "Secure Authentication",
    description:
      "Enterprise-grade authentication ensures your portfolio data stays private.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-blue-600" />,
    title: "Portfolio-Tailored Techniques",
    description:
      "Receive informational techniques aligned with your current holdings. Not investing advice.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    title: "1. Sign Up Securely",
    description:
      "Create your account and keep your portfolio data private.",
  },
  {
    icon: <Database className="h-8 w-8 text-blue-600" />,
    title: "2. Connect & Analyze",
    description:
      "Sync your portfolio or upload data. We compute stocks–metals correlations and trends.",
  },
  {
    icon: <Bot className="h-8 w-8 text-blue-600" />,
    title: "3. Explore AI-Powered Insights",
    description:
      "Chat and use dashboards for informational techniques. We are not an investing platform.",
  },
];
